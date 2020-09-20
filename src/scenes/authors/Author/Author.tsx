import React from "react";
import { Button, Typography } from "@material-ui/core";
import AuthorView from "./AuthorView";
import { RouteComponentProps, withRouter } from 'react-router';
import './Author.css'
import Loader from "../../../components/Loader/Loader";
import DeleteAuthorModal from "./DeleteAuthorModal";
import { RequestStatus } from "../../../model/consts/RequestStatus";
import {AuthorsService, AuthService} from "../../../services";


interface AuthorProps extends RouteComponentProps<MatchParams> {
    loadAvatarErrorCallback(): void,
    getAuthorDataErrorCallback(): void,
    editAuthorCallback(editAuthorStatus: RequestStatus): void,
    deleteAuthorCallback(editAuthorStatus: RequestStatus): void,
}

interface AuthorState {
    isAdmin: boolean,
    getAuthorDataStatus: RequestStatus,
    updateStatus: RequestStatus,
    deleteStatus: RequestStatus,
    showDelete: boolean,
    data: {
        id: number,
        firstName: string,
        lastName: string,
        nationality: string,
        birthday: any,
        photo: any,
    },
    error: any,
    books: any
}

interface MatchParams {
    id: string,
}

class Author extends React.Component<AuthorProps, AuthorState> {
    constructor(props: AuthorProps) {
        super(props);
        this.state = {
            getAuthorDataStatus: RequestStatus.NONE,
            isAdmin: AuthService.isAuthorized(["ROLE_ADMIN"]),
            data: {
                id: parseInt(this.props.match.params.id),
                firstName: '',
                lastName: '',
                nationality: '',
                birthday: '',
                photo: null,
            },
            showDelete: false,
            updateStatus: RequestStatus.NONE,
            deleteStatus: RequestStatus.NONE,
            error: null,
            books: { //BOOKTYPE etc. for later.
                book1: null,
                book2: null,
                book3: null,
                book4: null,
            },
        }
    }

    componentDidMount() {
        this.setState({ ...this.state, getAuthorDataStatus: RequestStatus.LOADING });
        AuthorsService.getAuthorData(this.state.data.id)
            .then((response: any) => {
                this.setState({ data: response.data, getAuthorDataStatus: RequestStatus.SUCCESS });
            })
            .catch((error: any) => {
                this.props.getAuthorDataErrorCallback();
                this.setState({ ...this.state, getAuthorDataStatus: RequestStatus.ERROR, error });
            });
    }


    handleEdit = () => {
        this.props.history.push(`/authors/edit/${this.state.data.id}`); //Push to home?
    }

    /* Delete author */
    handleDelete = () => this.setState({ showDelete: true });
    handleDeleteConfirm = () => this.deleteAuthor(this.state.data.id);
    handleDeleteCancel = () => this.setState({ showDelete: false });
    deleteAuthor = (id: number) => {
        this.setState({ deleteStatus: RequestStatus.LOADING, error: null });
        AuthorsService.deleteAuthor(id)
            .then(() => {
                this.props.deleteAuthorCallback(RequestStatus.SUCCESS);
                this.setState({ deleteStatus: RequestStatus.SUCCESS, error: null, showDelete: false });
                this.props.history.push("/");
            })
            .catch((error: any) => {
                this.props.deleteAuthorCallback(RequestStatus.ERROR);
                this.setState({ deleteStatus: RequestStatus.ERROR, error, showDelete: false });
            });
    }

    render() {
        return (
            <div className='route-container'>
                <div className='card-container'>
                    {this.renderButtons()}
                    {this.renderAuthor()}
                    {this.renderDelete()}
                </div>
            </div>
        );
    }

    /**
     * Renders AuthorView or AuthorEdit
     */

    renderAuthor() {
        const { data, books, getAuthorDataStatus } = this.state;
        if (getAuthorDataStatus === RequestStatus.LOADING) {
            return (
                <div>
                    <Typography align='center' variant='subtitle1'> <Loader /> </Typography>
                </div>
            );
        }
        return (
            <AuthorView
                data={data}
                books={books}
                error={getAuthorDataStatus === RequestStatus.ERROR}
            />
        );
    }

    renderButtons() {
        const { isAdmin } = this.state;
        if (isAdmin)
            return (
                <div className="button-divider">
                    <Button variant="outlined" color="secondary" onClick={this.handleDelete}>Eliminar Autor</Button>
                    <Button variant="contained" color="secondary" onClick={this.handleEdit}>Editar Autor</Button>
                </div>
            )
    }

    renderDelete() {
        const { showDelete, deleteStatus } = this.state;
        if (showDelete) {
            return (
                <DeleteAuthorModal
                    open={showDelete}
                    loading={deleteStatus === RequestStatus.LOADING}
                    onConfirm={this.handleDeleteConfirm}
                    onCancel={this.handleDeleteCancel}
                />
            );
        }
    }
}


export default withRouter(Author);
