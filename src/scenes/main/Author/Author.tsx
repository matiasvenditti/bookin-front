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
import {RouteComponentProps, withRouter} from 'react-router';
import {formatDateTime} from "../../../utils/formateDateTime";
import Flag from 'react-world-flags';


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
    books: any,
}

interface MatchParams {
    id: string,
}

class Author extends React.Component<AuthorProps, AuthorState> {
    constructor(props: AuthorProps) {
        super(props);
        this.state = {
            editAuthorMode: false,
            getAuthorDataStatus: RequestStatus.NONE,
            data: {
                id: this.props.match.params.id,
                firstName: 'Jorge Luis',
                lastName: 'Borges',
                nationality: 'AR',
                birthday: '1899-08-24',
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
        //this.setState({ ...this.state, getAuthorDataStatus: RequestStatus.LOADING });
        //getAuthorData(this.state.data.id)
        //    .then((response: any) => this.setState({ ...this.state, getAuthorDataStatus: RequestStatus.SUCCESS, data: response.data }))
        //    .catch((error: any) => this.setState({ ...this.state, getAuthorDataStatus: RequestStatus.ERROR, error }));
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

    render() {
        const { firstName, lastName, nationality, birthday, photo } = this.state.data;
        return (
            <div className='route-container'>
                <div className='card-container'>
                    <div className='image-name-container'>
                        <HoverableAvatar
                            src={photo || dummyAvatar}
                            id=''
                            onChange={this.handleChangePhoto}
                            onError={this.props.loadAvatarErrorCallback}
                        />
                        <Typography align='center' variant='h4'>{firstName + ' ' + lastName} <Flag code={nationality} height="16" /></Typography>

                        <Typography align='center' variant='h4'>{formatDateTime(birthday)}</Typography>


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
        const { editAuthorMode, data, getAuthorDataStatus } = this.state;
        if (editAuthorMode) {
            return (
                <AuthorEdit
                    // data={data}
                    // onCancel={this.handleCancel}
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