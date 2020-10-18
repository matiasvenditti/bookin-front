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
import {Book, User} from "../../../model";
import {ReviewWithUser} from "../../../model/ReviewWithUser";
import ReviewCard from "../../../components/Cards/ReviewCard/ReviewCard";
import {RequestStatus} from "../../../model/consts/RequestStatus";
import {DeleteReviewModal} from "../../review/DeleteReviewModal";
import ReviewService from "../../../services/ReviewService";
import CreateReview from "../../review/CreateReview/CreateReview";
import EditCard from "../../../components/Cards/EditCard/EditCard";


interface BookViewProps {
    data: Book,
    authors: Author[],
    reviews: ReviewWithUser[],
    currentUser: User,
    isAdmin: boolean,
    error: boolean,
    updateCallback(r: RequestStatus): void,
    user: any,
}

interface BookViewState {
    data: Book,
    authors: Author[],
    reviews: ReviewWithUser[],
    currentUser: User,
    isAdmin: boolean,
    showDelete: boolean,
    currentId: number,
    reviewDeleteStatus: RequestStatus,
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
            },
            currentUser: props.currentUser,
            authors: props.authors,
            isAdmin: props.isAdmin,
            reviews: props.reviews,
            showDelete: false,
            reviewDeleteStatus: RequestStatus.NONE,
            currentId: 0,

        }
    }

    handleConfirmDelete = () => this.deleteReview(this.state.currentId);
    handleDeleteCancel = () => this.setState({showDelete: false});

    deleteReview = (id: number) => {
        this.setState({reviewDeleteStatus: RequestStatus.LOADING});
        ReviewService.deleteReview(id)
            .then(() => {
                this.setState({reviewDeleteStatus: RequestStatus.SUCCESS});
                window.location.reload();
            })
            .catch(() => {
                this.setState({reviewDeleteStatus: RequestStatus.ERROR});
            });
        this.handleDeleteCancel();
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
        const reviews = this.props.reviews;
        return reviews.some(review => review.userId === this.props.user.id);
    }

    enableEdit = (j: number) =>{
        var review = this.state.reviews[j];
        review.edit = true;
        this.state.reviews[j] = review;
    }
    
    render() {
        const {data, authors, reviews} = this.state;
        const {error} = this.props
        const date = data.date ? data.date : new Date().toString();

        const createReview = !this.hasReview() ?
        <Grid item xs sm={6}>    
            <div>
                <CreateReview
                book={this.state.data}
                updateCallback={this.props.updateCallback}
                />
            </div>
        </Grid>:
        null;

        if (error) {
            return (
                <div>
                    <Typography align='center' color='error' variant='h6'>Hubo un error al obtener los datos del
                        Libro</Typography>
                </div>
            )
        } else {
            return (
                <div>
                    <Typography align='left' variant='h3'
                                className='title'>{data.title} </Typography>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className='book-container'
                    >
                        <Grid container item xs={5}>
                            <div className='inner-book-container'>
                                <Card
                                    style={
                                        {
                                            maxWidth: 345,
                                            border: "none",
                                            boxShadow: "none",
                                        }
                                    }
                                >
                                    <CardContent className='custom-card-container' style={{paddingLeft: 0}}>

                                        <Typography align='left' variant='h5'>Género: <Box display="inline-block"
                                                                                           fontWeight="fontWeightBold">{data.genre}</Box></Typography>
                                        <Typography align='left' variant='h5'>Idioma: <Box display="inline-block"
                                                                                           fontWeight="fontWeightBold">{data.language}</Box></Typography>
                                        <Typography align='left' variant='h5'>Fecha de publicación: <Box
                                            display="inline-block"
                                            fontWeight="fontWeightBold">{DateUtils.formatDateTimeYears(date.toString())}</Box></Typography>
                                    </CardContent>
                                    <CardMedia
                                        title={data.title}
                                        image={`data:image/jpeg;base64,${data.photo}`}
                                        style={
                                            {
                                                height: 100,
                                                paddingTop: '100%', // 16:9
                                                boxShadow: '',
                                            }
                                        }
                                    />
                                </Card>

                            </div>
                        </Grid>
                        <Grid container item xs={7}>
                            <Grid item xs={12}>
                                <div className='author-container'>
                                    <Typography align='left'
                                                variant='h4'
                                                style={{fontWeight: "bold", color: "darkgray"}}>Autores </Typography>
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
                                                <ListItem button component={Link}
                                                          href={`/authors/${item.id}`}>
                                                    <Badge
                                                        color='primary'
                                                        overlap='circle'
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'right',
                                                        }}
                                                        style={{
                                                            marginRight: 15,
                                                        }}
                                                        className={'avatar-image'}
                                                    >
                                                        <Avatar
                                                            src={`data:image/jpeg;base64,${item.photo}` || dummyAvatar}/>
                                                    </Badge>
                                                    <ListItemText
                                                        primary={authorData}
                                                        key={'text-' + i}
                                                    />
                                                </ListItem>
                                            )

                                            return (
                                                <div key={'author-view-item-' + i}>
                                                    {authorList}
                                                    {(i !== authors.length - 1) && <Divider key={'divider-' + i}/>}
                                                </div>
                                            )
                                        }) : <div key={'author-view-item'}>
                                            <ListItem button>
                                                <Badge
                                                    color='primary'
                                                    overlap='circle'
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'right',
                                                    }}
                                                    style={{
                                                        marginRight: 15,
                                                    }}
                                                    className={'avatar-image'}
                                                >
                                                    <Avatar
                                                        src={dummyAvatar}/>
                                                </Badge>
                                                <ListItemText
                                                    primary={
                                                        <Typography
                                                            variant="h6"
                                                            style={{
                                                                color: 'black',
                                                                display: 'flex',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            Autor Anonimo
                                                        </Typography>}
                                                />
                                            </ListItem>
                                        </div>}
                                    </List>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className='rating-container'>
                                    <Typography variant='h4' className='rating'> Rating </Typography>
                                    <Rating name="read-only" value={data.stars} precision={0.5} readOnly/>

                                </div>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Typography variant='h4' className='rating' style={{padding: 5}}> Reseñas </Typography>
                    <Grid
                        container
                        direction="row"
                        justify="space-evenly"
                        alignItems="flex-start"
                        spacing={3}
                        className='reviews-container'
                    >

                        {createReview}

                        {reviews.map((rev, j) => {
                            const {isAdmin, currentUser, data} = this.state;
                            return (
                                <Grid item xs sm={6} key={j}>
                                    <div key={'review-view-item-' + j}>
                                        {rev.edit ? <EditCard
                                                        id={rev.id}
                                                       stars={rev.stars}
                                                       comment={rev.comment}
                                                       reviewCreatorUserID={rev.userId}
                                                       currentUser={currentUser}
                                                       isAdmin={isAdmin}
                                                       reviewBookId={data.id}
                                                       reviewDisplayString={rev.userFirstName + ' ' + rev.userLastName}
                                                       editMode={() => this.enableEdit(j)}/> :
                                        <ReviewCard
                                            id={rev.id}
                                            stars={rev.stars}
                                            comment={rev.comment}
                                            reviewCreatorUserID={rev.userId}
                                            currentUser={currentUser}
                                            isAdmin={isAdmin}
                                            reviewBookId={data.id}
                                            reviewDisplayString={rev.userFirstName + ' ' + rev.userLastName}
                                            handleDelete={(reviewId: number) => {
                                                this.setState({...this.state, showDelete: true, currentId: reviewId,})
                                            }
                                            }
                                            handleEdit={() => null} //TODO
                                            editMode={() => this.enableEdit(j)}
                                        />}
                                    </div>
                                </Grid>
                            )
                        })}
                    </Grid>
                    {this.renderReviewDelete()}
                </div>

            )
        }
    }
}
