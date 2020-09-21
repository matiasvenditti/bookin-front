import React from "react";
import {RequestStatus} from "../../../model/consts/RequestStatus";
import {BookID} from "../../../model";
import {Button, Typography} from "@material-ui/core";
import Loader from "../../../components/Loader/Loader";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SweetAlert from "react-bootstrap-sweetalert";
import {RouteComponentProps, withRouter} from "react-router";
import {Author} from "../../../model/Author";
import BookView from "./BookView";
import "./Book.css"
import {UserRoles} from "../../../model/consts/Roles";
import { AuthService, BooksService } from "../../../services";


interface BookProps extends RouteComponentProps<MatchParams> {

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
            isAdmin: AuthService.isAuthorized([UserRoles.RoleAdmin]),
            data: {
                id: this.props.match.params.id,
                title: '',
                genre: '',
                date: '',
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
        const result: Promise<any> = Promise.all([BooksService.getBookData({id: this.state.data.id}), BooksService.getBookAuthors({id: this.state.data.id})]);
        result
            .then((response) => this.setState({
                data: response[0].data,
                authors: response[1].data,
                getBookDataStatus: RequestStatus.SUCCESS
            }))
            .catch((error: any) => this.setState({...this.state, getBookDataStatus: RequestStatus.ERROR, error}));
    };

    handleCancel = () => {
        this.setState({showDelete: false})
    };

    handleEdit = () => {
        const id = this.state.data.id;
        this.props.history.push(`/books/edit/${id}`)
    }

    handleDelete = () => {
        this.setState({showDelete: true})
    }

    handleConfirmDelete = () => {
        this.deleteBook({id: this.state.data.id});
    }


    deleteBook = (values: BookID) => {
        this.setState({deleteStatus: RequestStatus.LOADING, error: null});
        BooksService.deleteBook(values)
            .then(() => {
                this.setState({deleteStatus: RequestStatus.SUCCESS, error: null});
                this.props.history.push("/") //Push to home?

            })
            .catch((error: any) => {
                this.setState({deleteStatus: RequestStatus.ERROR, error});
                //console.log("Error deleting", error)
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
                <div className="button-container">
                    <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
                        <Button onClick={this.handleEdit}>Editar libro</Button>
                        <Button onClick={this.handleDelete}>Eliminar libro</Button>
                    </ButtonGroup>
                </div>
            )
    }

    renderDelete() {
        const {showDelete} = this.state;
        if (showDelete) return (
            <SweetAlert
                danger
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={this.handleConfirmDelete}
                onCancel={this.handleCancel}
                focusCancelBtn
            >
                Author will be permanently deleted
            </SweetAlert>
        )
    }


}

export default withRouter(Book);