import React from "react";
import {RequestStatus} from "../../../../model/consts/RequestStatus";
import {isAuthorized} from "../../../../services/AuthService";
import {Button, Typography} from "@material-ui/core";
import Loader from "../../../../components/Loader/Loader";
import {RouteComponentProps, withRouter} from "react-router";
import {deleteBook, getBookAuthors, getBookData} from "../../../../services/BookService";
import {BookID} from "../../../../model";
import {Author} from "../../../../model/Author";
import BookView from "./BookView";
import "./Book.css"
import {UserRoles} from "../../../../model/consts/Roles";
import {DeleteBookModal} from "./DeleteBookModal";

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
    data: {
        id: string,
        title: string,
        genre: string,
        date: string,
        photo: string,
        language: string,
        stars: number,
    },
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
            isAdmin: isAuthorized([UserRoles.RoleAdmin]),
            data: {
                id: this.props.match.params.id,
                title: '',
                genre: '',
                date: '',
                photo: "",
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
        const result: Promise<any> = Promise.all([getBookData({id: this.state.data.id}), getBookAuthors({id: this.state.data.id})]);
        result
            .then((response) =>
                this.setState({
                data: response[0].data,
                authors: response[1].data,
                getBookDataStatus: RequestStatus.SUCCESS
                })
            )
            .catch((error: any) => {
                this.setState({...this.state, getBookDataStatus: RequestStatus.ERROR, error});
                this.props.getBookDataErrorCallback();
            })
    };

    handleCancel = () => {
        this.setState({showDelete: false})
    };

    handleEdit = () => {
        this.props.history.push(`/books/edit/${this.state.data.id}`)
    }


    /* Delete Book */
    handleDelete = () => this.setState({ showDelete: true });
    handleDeleteConfirm = () => this.deleteBook({id: this.state.data.id});
    handleDeleteCancel = () => this.setState({ showDelete: false });
    deleteBook = (values: BookID) => {
        this.setState({deleteStatus: RequestStatus.LOADING, error: null});
        deleteBook(values)
            .then(() => {
                this.props.deleteBookCallback(RequestStatus.SUCCESS);
                this.setState({deleteStatus: RequestStatus.SUCCESS, error: null});
                this.props.history.push("/") //Push to home?

            })
            .catch((error) => {
                this.props.deleteBookCallback(RequestStatus.ERROR);
                this.setState({deleteStatus: RequestStatus.ERROR, error, showDelete:false});
            });
        this.handleCancel()
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
                <div className="button-divider">
                    <Button variant="contained" color="secondary" onClick={this.handleEdit}>Editar libro</Button>
                    <Button variant="outlined" color="secondary" onClick={this.handleDelete}>Eliminar libro</Button>
                </div>
            )
    }

    renderDelete() {
        const {showDelete, deleteStatus} = this.state;
        if (showDelete) return (
            <DeleteBookModal
                open={showDelete}
                loading={deleteStatus === RequestStatus.LOADING}
                onConfirm={this.handleDeleteConfirm}
                onCancel={this.handleDeleteCancel}
            />
        )
    }


}

export default withRouter(Book);