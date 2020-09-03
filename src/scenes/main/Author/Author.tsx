import {RequestStatus} from "../../../model/consts/RequestStatus";
import React from "react";
import {AuthorID} from "../../../model";
import {AxiosResponse} from "axios";
import {ResponseUpdate} from "../../../services/SessionService";
import {dummyAvatar} from "../../../assets";
import {AppBar, Avatar, Badge, Typography} from "@material-ui/core";
import SweetAlert from "react-bootstrap-sweetalert";
import {changeAuthorData, deleteAuthor, getAuthorData, updateAuthor, Author as AuthorS} from "../../../services/AuthorService";
import AuthorView from "./AuthorView";
import ModifyAuthorForm from "./ModifyAuthorForm";
import {RouteComponentProps, withRouter} from 'react-router';
import {formatDateTime} from "../../../utils/formateDateTime";
import Flag from 'react-world-flags';
import './Author.css'
import { UpdateAuthor } from "../../../model/UpdateAuthor";


interface AuthorProps extends RouteComponentProps<MatchParams>{
    loadAvatarErrorCallback(): void,
    editAuthorCallback(editAuthorStatus: RequestStatus): void,
}

interface AuthorState {
    editAuthorMode: boolean,
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
            books: { //BOOKTYPE etc. for later. TODO
                book1: null,
                book2: null,
                book3: null,
                book4: null,
            },
        }
    }

    componentDidMount() {
        this.setState({ ...this.state, getAuthorDataStatus: RequestStatus.LOADING });
        getAuthorData({id:this.state.data.id})
           .then((response: any) => this.setState({ ...this.state, getAuthorDataStatus: RequestStatus.SUCCESS, data: response.data }))
           .catch((error: any) => this.setState({ ...this.state, getAuthorDataStatus: RequestStatus.ERROR, error }));
    }

    handleChangePhoto = (id: string, type: string, file: string) => {
        this.setState({ ...this.state, updateStatus: RequestStatus.LOADING });
        const authorData = this.state.data;
        authorData.photo = file;
        // const formData = new FormData();
        // formData.append('photo', file);
        changeAuthorData(authorData, authorData.photo)
            .then(() => {
                this.setState({ ...this.state, updateStatus: RequestStatus.SUCCESS, data: { ...this.state.data, photo: file } })
                this.props.editAuthorCallback(RequestStatus.SUCCESS);
            })
            .catch((error) => {
                this.setState({ ...this.state, updateStatus: RequestStatus.ERROR });
                this.props.editAuthorCallback(RequestStatus.ERROR);
            })
    }


    handleCancel = () => {
        this.setState({ editAuthorMode: false, showDelete: false })
    };

    deleteAuthorTemp = () => {
        this.handleSubmit({ id: this.state.data.id });
        this.handleCancel();
    }


    handleSubmit = (values: AuthorID) => {
        this.setState({ deleteStatus: RequestStatus.LOADING, error: null });
        deleteAuthor(values)
            .then((response: AxiosResponse<ResponseUpdate>) => {
                this.setState({ deleteStatus: RequestStatus.SUCCESS, error: null });
                this.props.history.push("/") //Push to home?
            })
            .catch((error) => {
                this.setState({ deleteStatus: RequestStatus.ERROR, error });
            });
    }

    modifyAuthor = (values: UpdateAuthor , photo: File) => {
        updateAuthor(values, photo)
        .then((response: AxiosResponse<AuthorS>) => console.log(response.data))
        .catch((e) => console.error(e))
    }
    render() {
        const { firstName, lastName, nationality, birthday, photo } = this.state.data;
        return (
            <div className='route-container'>
                <div className='card-container'>
                    <div className='image-container'>
                        <Badge
                            color='primary'
                            overlap='circle'
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            className={'avatar-image'}
                        >
                            <Avatar src={photo || dummyAvatar} />

                        </Badge>

                        <Typography align='center' variant='h4'>{firstName + ' ' + lastName} </Typography>
                    </div>
                    <div className='subtitle-container'>
                        <Typography align='center' variant='subtitle2'><Flag code={nationality} height="16" />{'    ' + formatDateTime(birthday)}</Typography>
                    </div>


                    <AppBar position='static'>
                        {this.renderAuthor()}
                    </AppBar>

                </div>
                {/* <button onClick={this.handleDelete}> Delete profile</button>
                {this.renderDelete()} */}
            </div>


        );
    }

    /**
     * Renders AuthorView or AuthorEdit
     */
    renderAuthor() {
        const { editAuthorMode, data,books, getAuthorDataStatus } = this.state;
        if (editAuthorMode) {
            return (
                <ModifyAuthorForm
                    data={data}
                    onCancel={this.handleCancel}
                    onSubmit={this.modifyAuthor}

                    // editAuthorCallback={}
                />
            );
        } else {
            return (
                <AuthorView
                    data={books}
                    loading={getAuthorDataStatus === RequestStatus.LOADING}
                    error={getAuthorDataStatus === RequestStatus.ERROR}
                />
            );
        }
    }

    // TODO delete Author
    renderDelete() {
        const { showDelete } = this.state;
        if (showDelete) return (
            <SweetAlert
                danger
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={this.deleteAuthorTemp}
                onCancel={this.handleCancel}
                focusCancelBtn
            >
                Author will be permanently deleted
            </SweetAlert>
        )
    }


}
export default withRouter(Author);