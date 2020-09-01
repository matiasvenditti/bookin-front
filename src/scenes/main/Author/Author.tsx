import {RequestStatus} from "../../../model/consts/RequestStatus";
import React, {Component} from "react";
import {AuthorEditInterface, AuthorID, UserID} from "../../../model";
import {AxiosResponse} from "axios";
import {logout, ResponseUpdate} from "../../../services/SessionService";
import HoverableAvatar from "../../../components/HoverableAvatar/HoverableAvatar";
import {dummyAvatar} from "../../../assets";
import {AppBar, Tab, Tabs, Typography} from "@material-ui/core";
import SweetAlert from "react-bootstrap-sweetalert";
import {changeAuthorData, deleteAuthor, getAuthorData} from "../../../services/AuthorService";
import AuthorView from "./AuthorView";
import AuthorEdit from "./AuthorEdit";
import ModifyAuthorForm from "./ModifyAuthorForm";


interface AuthorProps {
    loadAvatarErrorCallback(): void,
    editAuthorCallback(editAuthorStatus: RequestStatus): void,
    id: any,
}

interface AuthorState {
    editAuthorMode: boolean,
    getAuthorDataStatus: RequestStatus,
    updateStatus: any,
    deleteStatus: any,
    showDelete: boolean, //Esto sirve para despues. Si se muestra o no muestra el popup de delete
    data: any,
    error: any,
    books: any,
}

export default class Author extends Component<AuthorProps, AuthorState> {
    constructor(props: AuthorProps) {
        super(props);
        this.state = {
            editAuthorMode: false,
            getAuthorDataStatus: RequestStatus.NONE,
            data: {
                id: props.id,
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
            books: { //BOOKTYPE etc.
                book1: null,
                book2: null,
                book3: null,
                book4: null,
            },
        }
    }

    componentDidMount() {
        this.setState({ ...this.state, getAuthorDataStatus: RequestStatus.LOADING });
        getAuthorData(this.state.data.id)
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

    // TODO delete Author
    handleDelete = () => {
        this.setState({
            showDelete: !this.state.showDelete
        });
    }

    // TODO delete Author
    deleteProfile = () => {
        this.setState({
            showDelete: false
        });
    }

    handleSubmit = (values: AuthorID) => {
        this.setState({ deleteStatus: RequestStatus.LOADING, error: null });
        deleteAuthor(values)
            .then((response: AxiosResponse<ResponseUpdate>) => {
                this.setState({ deleteStatus: RequestStatus.SUCCESS, error: null });
                logout();
                // this.props.history.push('/');
            })
            .catch((error) => {
                this.setState({ deleteStatus: RequestStatus.ERROR, error });
            });
    }

    // TODO delete user
    deleteAuthorTemp = () => {
        this.handleSubmit({ id: this.state.data.id });
        this.handleCancel();
    }

    render() {
        const { firstName, lastName, nationality, birthday, photo } = this.state.data;
        return (
            <div className='route-container'>
                <div className='card-container'>
                    <div className='image-name-container'>
                        <HoverableAvatar
                            src={this.state.data.photo || dummyAvatar}
                            id=''
                            onChange={this.handleChangePhoto}
                            onError={this.props.loadAvatarErrorCallback}
                        />
                        {/*<ReactCountryFlag countryCode="this.state.nationality" />*/}
                        <Typography align='center' variant='h4'>{firstName + ' ' + lastName}</Typography>
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
     * Renders ProfileView or ProfileEdit
     */
    renderAuthor() {
        const { editAuthorMode, data, getAuthorDataStatus } = this.state;
        if (editAuthorMode) {
            return (
                <ModifyAuthorForm
                    data={data}
                    onCancel={this.handleCancel}
                    // editAuthorCallback={}
                />
            );
        } else {
            return (
                <AuthorView
                    data={data}
                    loading={getAuthorDataStatus === RequestStatus.LOADING}
                    error={getAuthorDataStatus === RequestStatus.ERROR}
                />
            );
        }
    }

    // TODO delete user
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