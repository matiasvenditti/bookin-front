import React, {Component} from "react";
import {
    Avatar,
    Badge,
    Box,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Link,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@material-ui/core";
import {dummyAvatar} from "../../../assets";
import {Author} from "../../../model/Author";
import Rating from "@material-ui/lab/Rating";
import {ConstsUtils, DateUtils} from "../../../utils";
import Flag from 'react-world-flags';
import {Book, NewReview, User} from "../../../model";
import {ReviewWithUser} from "../../../model/ReviewWithUser";
import ReviewCard from "../../../components/Cards/ReviewCard/ReviewCard";
import {RequestStatus} from "../../../model/consts/RequestStatus";
import {DeleteReviewModal} from "../../review/DeleteReviewModal";
import ReviewService from "../../../services/ReviewService";
import CreateReview from "../../review/CreateReview/CreateReview";
import BooksService from "../../../services/BooksService";
import {AxiosResponse} from "axios";
import {Review} from "../../../model/Review";
import EditCard from "../../../components/Cards/EditCard/EditCard";
import {EditableReview} from "../../../model/EditableReview";
import {NewEditReview} from "../../../model/NewEditReview";


interface BookViewProps {
    data: Book,
    authors: Author[],
    reviews: EditableReview[],
    currentUser: User,
    error: boolean,
    updateCallback(r: RequestStatus): void,
    deleteReviewCallback(r: RequestStatus): void,
    updateReviewCallback(r: RequestStatus): void,
    user: any,
}

interface BookViewState {
    data: Book,
    authors: Author[],
    reviews: EditableReview[],
    currentUser: User,
    showDelete: boolean,
    currentId: number,
    reviewDeleteStatus: RequestStatus,
    reviewCreateStatus: RequestStatus,
}

export default class BookView extends Component<BookViewProps, BookViewState> {
    constructor(props: BookViewProps) {
        super(props);
        this.state = {
            data: {
                id: props.data.id,
                title: props.data.title,
                genre: props.data.genre,
                date: props.data.date,
                photo: props.data.photo,
                stars: props.data.stars,
                language: props.data.language,
                authors: props.data.authors,
            },
            currentUser: props.currentUser,
            authors: props.authors,
            reviews: props.reviews,
            showDelete: false,
            reviewDeleteStatus: RequestStatus.NONE,
            reviewCreateStatus: RequestStatus.NONE,
            currentId: 0,

        }
    }

    handleConfirmDelete = () => this.deleteReview(this.state.currentId);
    handleDeleteCancel = () => this.setState({showDelete: false});

    deleteReview = (id: number) => {
        this.setState({reviewDeleteStatus: RequestStatus.LOADING});
        ReviewService.deleteReview(id)
            .then(() => {
                const new_reviews = this.state.reviews.filter((review) => review.review.id !== id);
                this.setState({reviewDeleteStatus: RequestStatus.SUCCESS, reviews: new_reviews});
                this.updateBook();
                this.props.deleteReviewCallback(RequestStatus.SUCCESS);
            })
            .catch(() => {
                this.setState({reviewDeleteStatus: RequestStatus.ERROR});
                this.props.deleteReviewCallback(RequestStatus.ERROR);
            });
        this.handleDeleteCancel();
    }

    createReview = (newReview: NewReview) => {
        this.setState({reviewCreateStatus: RequestStatus.LOADING});
        ReviewService.createReview(newReview)
            .then((response: AxiosResponse<Review>) => {
                const review: Review = response.data;
                const reviewWithUser: ReviewWithUser = {id: review.id, stars: review.stars, comment: review.comment, userId: newReview.user.id, userFirstName: newReview.user.firstName, userLastName: newReview.user.lastName};
                const editableReview: EditableReview = {review : reviewWithUser, editMode: false}
                this.setState((prevState: BookViewState) => ({
                    ...prevState,
                    reviewCreateStatus: RequestStatus.SUCCESS,
                    reviews: [...prevState.reviews, editableReview]
                }))
                this.updateBook();
                this.props.updateCallback(RequestStatus.SUCCESS);
            })
            .catch(() => {
                this.setState((prevState: BookViewState) => ({
                    ...prevState,
                    reviewCreateStatus: RequestStatus.ERROR
                }))
                this.props.updateCallback(RequestStatus.ERROR);
            });
    }

    renderReviewDelete() {
        const {showDelete, reviewDeleteStatus} = this.state;
        if (showDelete) return (
            <DeleteReviewModal
                open={showDelete}
                loading={reviewDeleteStatus === RequestStatus.LOADING}
                onConfirm={this.handleConfirmDelete}
                onCancel={this.handleDeleteCancel}
            />
        )
    }
    
    hasReview() {
        const reviews = this.state.reviews;
        return reviews.some(review => review.review.userId === this.props.user.id);

    }

    enableEdit = (j: number) =>{
        let reviews = this.state.reviews;
        const review = this.state.reviews[j];
        review.editMode = !this.state.reviews[j].editMode;
        reviews[j] = review;
        this.setState({
            reviews
        })
    }

    updateBook() {
        BooksService.getBookData(this.props.data.id)
            .then((response) => {
                this.setState({data: response.data})
            })
    }


    submitChanges = (review: NewEditReview, id: number, key: number) => {
        let reviews = this.state.reviews;
        ReviewService.editReview(review, id)
            .then((response: AxiosResponse<NewEditReview>) => {
                const editableReview: EditableReview = {...reviews[key], editMode: false, review: {...reviews[key].review, stars: response.data.stars, comment: response.data.comment}}
                this.setState((prevState: BookViewState) => ({
                    ...prevState,
                    reviews: [
                        ...reviews.slice(0, key),
                        editableReview,
                        ...reviews.slice(key+1)
                    ]
                }))
                this.updateBook();
                this.props.updateReviewCallback(RequestStatus.SUCCESS);
            })
            .catch(() => {
                this.props.updateReviewCallback(RequestStatus.ERROR);
            })
    }

    isAnonymous() {
        return (this.props.user.id == null);
    }


    render() {
        const {data, authors} = this.state;
        const {error} = this.props
        const date = data.date ? data.date : new Date().toString();

        const createReview = (!this.hasReview() && !this.isAnonymous()) ?
        <Grid item xs sm={6}>    
            <div>
                <CreateReview
                book={this.state.data}
                handleSubmit={this.createReview}
                />
            </div>
        </Grid>:
        null;

        const {reviews} = this.state;

        if (error) {
            return (
                <div>
                    <Typography
                        align='center'
                        color='error'
                        variant='h6'
                    >
                        {`Hubo un error al obtener los datos del Libro`}
                    </Typography>
                </div>
            )
        } else {
            return (
                <div>
                    <Typography
                        align='left'
                        className='title'
                        style={{fontSize: 35, fontWeight: 'bold'}}
                    >{data.title} </Typography>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className='book-container'
                    >
                        <Grid container item xs={5}>
                            <div className='inner-book-container'>
                                <Card style={{
                                    maxWidth: 345,
                                    border: "none",
                                    boxShadow: "none",
                                }}>
                                    <CardContent className='custom-card-container' style={{paddingLeft: 0}}>
                                        <Typography align='left' variant='h5'>
                                            {`Género: `}
                                            <Box display="inline-block" fontWeight="fontWeightBold">
                                                {data.genre}
                                            </Box>
                                        </Typography>
                                        <Typography align='left' variant='h5'>
                                            {`Idioma: `}
                                            <Box display="inline-block" fontWeight="fontWeightBold">
                                                {ConstsUtils.getLanguageValue(data.language)}
                                            </Box>
                                        </Typography>
                                        <Typography align='left' variant='h5'>
                                            {`Fecha de publicación: `}
                                            <Box display="inline-block" fontWeight="fontWeightBold">
                                                {DateUtils.formatDateTimeYears(date.toString())}
                                            </Box>
                                        </Typography>
                                    </CardContent>
                                    <CardMedia
                                        title={data.title}
                                        image={`data:image/jpeg;base64,${data.photo}`}
                                        style={{
                                            height: 100,
                                            paddingTop: '100%', // 16:9
                                            boxShadow: '',
                                        }}
                                    />
                                </Card>
                            </div>
                        </Grid>
                        <Grid container item xs={7}>
                            <Grid item xs={12}>
                                <div className='author-container'>
                                    <Typography
                                        align='left'
                                        variant='h4'
                                        style={{fontWeight: "bold", color: "darkgray"}}
                                    >{`Autores `}</Typography>
                                    <List style={{backgroundColor: '#f6f6f7', padding: 0, margin: '8px 0'}}>
                                        {authors.length > 0 ? authors.map((item, i) => {
                                            const authorData = (
                                                <Typography
                                                    variant="h6"
                                                    style={{color: 'black', display: 'flex', alignItems: 'center'}}
                                                >
                                                    {item.firstName + ' ' + item.lastName + ' '}
                                                    <Flag
                                                        style={{marginLeft: 10}}
                                                        code={ConstsUtils.getCountryName(item.nationality)}
                                                        height="20"
                                                    />
                                                </Typography>
                                            );

                                            const authorList = (
                                                <ListItem button component={Link} href={`/authors/${item.id}`}>
                                                    <Badge
                                                        color='primary'
                                                        overlap='circle'
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'right',
                                                        }}
                                                        style={{marginRight: 15}}
                                                        className='avatar-image'
                                                    >
                                                        <Avatar src={`data:image/jpeg;base64,${item.photo}` || dummyAvatar}/>
                                                    </Badge>
                                                    <ListItemText
                                                        primary={authorData}
                                                        key={'text-' + i}
                                                    />
                                                </ListItem>
                                            );

                                            return (
                                                <div key={'author-view-item-' + i}>
                                                    {authorList}
                                                    {(i !== authors.length - 1) && <Divider key={'divider-' + i}/>}
                                                </div>
                                            )
                                        })
                                        :
                                        <div key={'author-view-item'}>
                                            <ListItem button>
                                                <Badge
                                                    color='primary'
                                                    overlap='circle'
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'right',
                                                    }}
                                                    style={{marginRight: 15}}
                                                    className={'avatar-image'}
                                                >
                                                    <Avatar src={dummyAvatar}/>
                                                </Badge>
                                                <ListItemText primary={
                                                    <Typography
                                                        variant="h6"
                                                        style={{
                                                            color: 'black',
                                                            display: 'flex',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        Autor Anonimo
                                                    </Typography>
                                                }/>
                                            </ListItem>
                                        </div>}
                                    </List>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className='rating-container'>
                                    <Typography variant='h4' className='rating'>{` Rating `}</Typography>
                                    <Rating name="read-only" value={this.state.data.stars} precision={0.5} readOnly/>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Typography
                        variant='h4'
                        className='rating'
                        style={{padding: 5}}
                    >{` Reseñas `}</Typography>
                    <Grid container spacing={3} className='reviews-container'>
                        {createReview}
                        {reviews.map((rev, j) => {
                            const {currentUser, data} = this.state;
                            return (
                                <Grid item xs={6} key={j}>
                                    <div key={'review-view-item-' + j}>
                                        {rev.editMode ?
                                            <EditCard
                                                id={rev.review.id}
                                                index={j}
                                                stars={rev.review.stars}
                                                comment={rev.review.comment}
                                                reviewCreatorUserID={rev.review.userId}
                                                currentUser={currentUser}
                                                reviewBookId={data.id}
                                                reviewDisplayString={rev.review.userFirstName + ' ' + rev.review.userLastName}
                                                editMode={() => this.enableEdit(j)}
                                                onSubmit={this.submitChanges}
                                            />
                                            :
                                            <ReviewCard
                                                id={rev.review.id}
                                                stars={rev.review.stars}
                                                comment={rev.review.comment}
                                                reviewCreatorUserID={rev.review.userId}
                                                currentUser={currentUser}
                                                isProfile={false}
                                                reviewBookId={data.id}
                                                reviewDisplayString={rev.review.userFirstName + ' ' + rev.review.userLastName}
                                                handleDelete={(reviewId: number) => {
                                                    this.setState({...this.state, showDelete: true, currentId: reviewId,})
                                                }}
                                                handleEdit={() => this.enableEdit(j)}
                                            />
                                        }
                                    </div>
                                </Grid>
                            );
                        })}
                    </Grid>
                    {this.renderReviewDelete()}
                </div>
            )
        }
    }
}
