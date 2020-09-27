import React from "react";
import {RequestStatus} from "../../../model/consts/RequestStatus";
import {BookID} from "../../../model";
import {Button, Typography} from "@material-ui/core";
import Loader from "../../../components/Loader/Loader";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {RouteComponentProps, withRouter} from "react-router";
import {Author} from "../../../model/Author";
import {Book as BookModel} from '../../../model/Book';
import BookView from "./BookView";
import "./Book.css"
import {UserRoles} from "../../../model/consts/Roles";
import { AuthService, BooksService } from "../../../services";
import { DeleteBookModal } from "./DeleteBookModal";


interface BookProps extends RouteComponentProps<MatchParams> {
    deleteBookCallback(deleteBookStatus: RequestStatus): void,
    getBookDataErrorCallback():void,
}

interface BookState {
    isAdmin: boolean,
    getBookDataStatus: RequestStatus,
    updateStatus: any,
    deleteStatus: any,
    showDelete: boolean,
    data: BookModel,
    authors: Author[],
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
                id: parseInt(this.props.match.params.id),
                title: '',
                genre: '',
                date: new Date(),
                photo: '',
                language: '',
                stars: 0,
            },
            authors: [],
            showDelete: false,
            updateStatus: RequestStatus.NONE,
            deleteStatus: RequestStatus.NONE,
            error: null,
        }
    }

    componentDidMount() {
        this.setState({...this.state, getBookDataStatus: RequestStatus.LOADING});
        this.getData();
    }

    getData = () => {
        const result: Promise<any> = Promise.all([
            BooksService.getBookData(this.state.data.id),
            BooksService.getBookAuthors(this.state.data.id)
        ]);
        result
            .then((response) => this.setState({
                data: response[0].data,
                authors: response[1].data,
                getBookDataStatus: RequestStatus.SUCCESS
            }))
            .catch((error: any) => {
                this.setState({...this.state, getBookDataStatus: RequestStatus.ERROR, error})
                this.props.getBookDataErrorCallback();
            });
    };


    handleEdit = () => {
        const id = this.state.data.id;
        this.props.history.push(`/books/edit/${id}`)
    }

    handleDelete = () => this.setState({showDelete: true});
    handleConfirmDelete = () => this.deleteBook(this.state.data.id);
    handleDeleteCancel  = () => this.setState({showDelete: false});
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
        this.handleDeleteCancel();
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
        const {data, getBookDataStatus, authors} = this.state;
        if (getBookDataStatus === RequestStatus.LOADING) {
            return (
                <div>
                    <Typography align='center' variant='subtitle1'> <Loader/> </Typography>
                </div>
            );
        }
        return (
            <BookView
                data={data}
                authors={authors}
                error={getBookDataStatus === RequestStatus.ERROR}
            />
        );
    }

    renderButtons() {
        const {isAdmin} = this.state;
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