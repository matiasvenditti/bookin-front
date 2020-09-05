import {RequestStatus} from "../../../model/consts/RequestStatus";
import React from "react";
import {AuthorID} from "../../../model";
import {changeAuthorData, deleteAuthor, getAuthorData, Author as Authors} from "../../../services/AuthorService";
import AuthorView from "./AuthorView";
import ModifyAuthorForm from "./ModifyAuthorForm";
import {RouteComponentProps, withRouter} from 'react-router';
import './Author.css'
import {isAuthorized} from "../../../services/AuthService";
import {UpdateAuthor} from "../../../model/UpdateAuthor";
import {AxiosResponse} from "axios";
import {Button, ButtonGroup} from "@material-ui/core";


interface AuthorProps extends RouteComponentProps<MatchParams> {
    loadAvatarErrorCallback(): void,

    editAuthorCallback(editAuthorStatus: RequestStatus): void,
}

interface AuthorState {
    editAuthorMode: boolean,
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
            editAuthorMode: true,
            getAuthorDataStatus: RequestStatus.NONE,
            isAdmin: isAuthorized(["ROLE_ADMIN"]),
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
                ...this.state,
                getAuthorDataStatus: RequestStatus.SUCCESS,
                data: response.data
            }))
            .catch((error: any) => this.setState({...this.state, getAuthorDataStatus: RequestStatus.ERROR, error}));
    }

    handleCancel = () => {
        this.setState({editAuthorMode: false, showDelete: false})
    };

    handleModify = () => {
        this.setState({editAuthorMode: !this.state.editAuthorMode})
    }

    deleteAuthorTemp = () => {
        this.handleDelete({id: this.state.data.id});
        this.handleCancel();
    }


    handleDelete = (values: AuthorID) => {
        this.setState({deleteStatus: RequestStatus.LOADING, error: null});
        deleteAuthor(values)
            .then(() => {
                this.setState({deleteStatus: RequestStatus.SUCCESS, error: null});
                this.props.history.push("/") //Push to home?
            })
            .catch((error) => {
                this.setState({deleteStatus: RequestStatus.ERROR, error});
            });
    }

    handleSubmit = (values: UpdateAuthor, photo: File) => {
        values.id = this.state.data.id;
        changeAuthorData(values, photo)
            .then((response: AxiosResponse<Authors>) => console.log(response.data))
            .catch((e) => console.error(e))
    }


    render() {
        return (
            <div className='route-container'>
                <div className='card-container'>
                    {this.renderButtons()}
                    {this.renderAuthor()}
                </div>
            </div>


        );
    }

    /**
     * Renders AuthorView or AuthorEdit
     */

    renderAuthor() {
        const {editAuthorMode, data, books, getAuthorDataStatus} = this.state;
        if (editAuthorMode) {
            return (
                <ModifyAuthorForm
                    data={data}
                    onCancel={this.handleCancel}
                    onSubmit={this.handleSubmit}
                    // editAuthorCallback={}
                />
            );
        } else {
            return (
                <AuthorView
                    data={data}
                    books={books}
                    loading={getAuthorDataStatus === RequestStatus.LOADING}
                    error={getAuthorDataStatus === RequestStatus.ERROR}
                />
            );
        }
    }

    renderButtons() {
        const {isAdmin} = this.state;
        if (!isAdmin)
            return (
                <div className="button-divider">
                    <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
                        <Button onClick={this.handleModify}> Edit profile</Button>
                        <Button onClick={this.deleteAuthorTemp}>Delete Profile</Button>
                    </ButtonGroup>
                </div>
            )
    }


}
export default withRouter(Author);