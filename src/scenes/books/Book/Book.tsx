import React from "react";
import {RequestStatus} from "../../../model/consts/RequestStatus";
import {Button , Typography} from "@material-ui/core";
import Loader from "../../../components/Loader/Loader";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {RouteComponentProps, withRouter} from "react-router";
import {Author} from "../../../model/Author";
import {Book as BookModel} from '../../../model/Book';
import BookView from "./BookView";
import "./Book.css"
import {UserRoles} from "../../../model/consts/Roles";
import {AuthService, BooksService, UserService} from "../../../services";
import {DeleteBookModal} from "./DeleteBookModal";
import {ReviewWithUser} from "../../../model/ReviewWithUser";
import ReviewService from "../../../services/ReviewService";



interface BookProps extends RouteComponentProps<MatchParams> {
    deleteBookCallback(deleteBookStatus: RequestStatus): void,
    updateCallback(r: RequestStatus): void,
    getBookDataErrorCallback(): void,
}

interface BookState {
    isAdmin: boolean,
    currentUser: any,
    getBookDataStatus: RequestStatus,
    updateStatus: any,
    deleteStatus: any,
    showDelete: boolean,
    data: BookModel,
    authors: Author[],
    reviews: ReviewWithUser[],
    error: any,
}

interface MatchParams {
    id: string,
}

class Book extends React.Component<BookProps, BookState> {
    constructor(props: BookProps) {
        super(props);
        this.state = {
            getBookDataStatus: RequestStatus.NONE,
            isAdmin: AuthService.isAuthorized([UserRoles.RoleAdmin]),
            data: {
                id: -1,
                title: '',
                genre: '',
                date: new Date(),
                photo: '',
                language: '',
                stars: 0,
            },
            authors: [],
            reviews: [],
            currentUser: [],
            showDelete: false,
            updateStatus: RequestStatus.NONE,
            deleteStatus: RequestStatus.NONE,
            error: null,
        }
    }

    componentDidMount() {
        this._bookDataRequest();
    }

    componentDidUpdate(prevProps: any) {
        if (prevProps.match.params.id !== this.props.match.params.id) {

            this._bookDataRequest();
        }
    }


    _bookDataRequest = () => {
        const id = parseInt(this.props.match.params.id);
        this.setState({...this.state, getBookDataStatus: RequestStatus.LOADING});

        const result: Promise<any> = Promise.all([
            BooksService.getBookData(id),
            BooksService.getBookAuthors(id),
            ReviewService.getReviews(id),
            UserService.getUserData()
        ]);
        result
            .then((response) => this.setState({
                data: response[0].data,
                authors: response[1].data,
                reviews: response[2].data,
                currentUser: response[3].data,
                getBookDataStatus: RequestStatus.SUCCESS,

            }))
            .catch((error: any) => {
                this.setState({...this.state, getBookDataStatus: RequestStatus.ERROR, error})
                this.props.getBookDataErrorCallback();
            });

    };


    handleEdit = () => this.props.history.push(`/books/edit/${this.state.data.id}`);

    handleDelete = () => this.setState({showDelete: true});
    handleConfirmDelete = () => {
            this.deleteBook(this.state.data.id);
    }
    handleDeleteCancel = () => this.setState({showDelete: false});
    deleteBook = (id: number) => {
        this.setState({deleteStatus: RequestStatus.LOADING, error: null});
        BooksService.deleteBook(id)
            .then(() => {
                this.props.deleteBookCallback(RequestStatus.SUCCESS);
                this.setState({deleteStatus: RequestStatus.SUCCESS, error: null});
                this.props.history.push("/");
            })
            .catch((error: any) => {
                this.props.deleteBookCallback(RequestStatus.ERROR);
                this.setState({deleteStatus: RequestStatus.ERROR, error});
            });

    }

    render() {
        return (
            <div className='route-container'>
                <div className='card-container'>
                    {this.renderButtons()}
                    {this.renderBook()}
                    {this.renderDelete()}
                </div>
            </div>
        );
    }

    /**
     * Renders AuthorView or AuthorEdit
     */

    renderBook() {
        const {data, getBookDataStatus, authors, reviews, currentUser, isAdmin} = this.state;
        if (getBookDataStatus === RequestStatus.LOADING) {
            return (
                <div>
                    <Typography align='center' variant='subtitle1'> <Loader/> </Typography>
                </div>

            );
        }
        return (
            <BookView
                user={this.state.currentUser}
                data={data}
                currentUser={currentUser}
                authors={authors}
                reviews={reviews}
                error={getBookDataStatus === RequestStatus.ERROR}
                updateCallback={this.props.updateCallback}
            />
        );
    }

    renderButtons() {
        const {isAdmin  } = this.state;
        if (isAdmin)
            return (
                <div className="button-container">
                    <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
                        <Button onClick={this.handleEdit}>Editar libro</Button>
                        <Button onClick={this.handleDelete}>Eliminar libro</Button>
                    </ButtonGroup>
                </div>
            )
    }

    renderDelete() {
        const {showDelete, deleteStatus} = this.state;
        if (showDelete) return (
            <DeleteBookModal
                open={showDelete}
                loading={deleteStatus === RequestStatus.LOADING}
                onConfirm={this.handleConfirmDelete}
                onCancel={this.handleDeleteCancel}
            />
        )
    }


}

export default withRouter(Book);