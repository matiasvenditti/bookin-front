import {RequestStatus} from "../../../model/consts/RequestStatus";
import React from "react";
import {AuthorID} from "../../../model";
import {Button, Typography} from "@material-ui/core";
import {deleteAuthor, getAuthorData} from "../../../services/AuthorService";
import AuthorView from "./AuthorView";
import {RouteComponentProps, withRouter} from 'react-router';
import './Author.css'
import {isAuthorized} from "../../../services/AuthService";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SweetAlert from "react-bootstrap-sweetalert";
import Loader from "../../../components/Loader/Loader";
import {UserRoles} from "../../../model/consts/Roles";


interface AuthorProps extends RouteComponentProps<MatchParams> {
    loadAvatarErrorCallback(): void,
    editAuthorCallback(editAuthorStatus: RequestStatus): void,
}

interface AuthorState {
    isAdmin: boolean,
    getAuthorDataStatus: RequestStatus,
    updateStatus: any,
    deleteStatus: any,
    showDelete: boolean,
    data: {
        id: string,
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
            isAdmin: isAuthorized([UserRoles.RoleAdmin]),
            data: {
                id: this.props.match.params.id,
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
        this.setState({...this.state, getAuthorDataStatus: RequestStatus.LOADING});
        getAuthorData({id: this.state.data.id})
            .then((response: any) => this.setState({
                data: response.data,
                getAuthorDataStatus: RequestStatus.SUCCESS

            }))
            .catch((error: any) => this.setState({...this.state, getAuthorDataStatus: RequestStatus.ERROR, error}));
    }

    handleCancel = () => {
        this.setState({showDelete: false})
    };

    handleEdit = () => {
        const id = this.state.data.id;
        this.props.history.push(`/authors/edit/${id}`) //Push to home?
    }

    handleDelete = () => {
        this.setState({showDelete: true})
    }

    handleConfirmDelete = () => {
        this.deleteAuthor({id : this.state.data.id});
    }


    deleteAuthor = (values: AuthorID) => {
        this.setState({deleteStatus: RequestStatus.LOADING, error: null});
        deleteAuthor(values)
            .then(() => {
                this.setState({deleteStatus: RequestStatus.SUCCESS, error: null});
                this.props.history.push("/") //Push to home?

            })
            .catch((error) => {
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
        const {data, books, getAuthorDataStatus} = this.state;
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
        const {isAdmin} = this.state;
        if (isAdmin)
            return (
                <div className="button-divider">
                    <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
                        <Button onClick={this.handleEdit}>Edit profile</Button>
                        <Button onClick={this.handleDelete}>Delete Profile</Button>
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
export default withRouter(Author);