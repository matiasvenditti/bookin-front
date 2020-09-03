import React, { Component } from 'react';
import { EditVar } from '../../../model/consts/EditVar';
import { RequestStatus } from '../../../model/consts/RequestStatus';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';
import { Typography, Tabs, Tab, AppBar } from '@material-ui/core';
import { dummyAvatar } from '../../../assets';
import './Profile.css'
import HoverableAvatar from '../../../components/HoverableAvatar/HoverableAvatar';
import { getUserData, changeUserData } from '../../../services/UserService';
import SweetAlert from "react-bootstrap-sweetalert/dist";
import { ResponseUpdate, update, deleteProfile, logout } from "../../../services/SessionService";
import { AxiosResponse } from "axios";
import { UserID } from "../../../model";


interface ProfileProps {
    loadAvatarErrorCallback(): void,
    editProfileCallback(editProfileStatus: RequestStatus): void,
}

interface ProfileState {
    currentTab: string,
    editProfileMode: boolean,
    getUserDataStatus: RequestStatus,
    editVariable: EditVar,
    updateStatus: any,
    deleteStatus: any,
    showDelete: boolean,
    data: any,
    error: any,
}

export default class Profile extends Component<ProfileProps, ProfileState> {
    constructor(props: ProfileProps) {
        super(props);
        this.state = {
            currentTab: 'profile',
            editProfileMode: false,
            getUserDataStatus: RequestStatus.NONE,
            data: {
                firstName: '',
                lastName: '',
                email: '',
                gender: '',
                photo: null,
            },
            showDelete: false,
            updateStatus: RequestStatus.NONE,
            deleteStatus: RequestStatus.NONE,
            editVariable: EditVar.PASSWORD,
            error: null,
        }
    }

    componentDidMount() {
        this.setState({ ...this.state, getUserDataStatus: RequestStatus.LOADING });
        getUserData()
            .then((response: any) => this.setState({ ...this.state, getUserDataStatus: RequestStatus.SUCCESS, data: response.data }))
            .catch((error: any) => this.setState({ ...this.state, getUserDataStatus: RequestStatus.ERROR, error }));
    }

    handleChangePhoto = (id: string, type: string, file: string) => {
        this.setState({ ...this.state, updateStatus: RequestStatus.LOADING });
        const userData = this.state.data;
        userData.photo = file;
        // const formData = new FormData();
        // formData.append('photo', file);
        changeUserData(0, userData)
            .then(() => {
                this.setState({ ...this.state, updateStatus: RequestStatus.SUCCESS, data: { ...this.state.data, photo: file } })
                this.props.editProfileCallback(RequestStatus.SUCCESS);
            })
            .catch((error) => {
                this.setState({ ...this.state, updateStatus: RequestStatus.ERROR });
                this.props.editProfileCallback(RequestStatus.ERROR);
            })
    }

    handleChangeTab = (e: any, newValue: any) => {
        this.setState({ ...this.state, currentTab: newValue });
    }

    handleCancel = () => {
        this.setState({ editProfileMode: false, showDelete: false })
    };

    // TODO delete user
    handleDelete = () => {
        this.setState({
            showDelete: !this.state.showDelete
        });
    }

    // TODO delete user
    deleteProfile = () => {
        this.setState({
            showDelete: false
        });
    }

    handleSubmit = (values: UserID) => {
        this.setState({ deleteStatus: RequestStatus.LOADING, error: null });
        deleteProfile(values)
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
    deleteProfileTemp = () => {
        this.handleSubmit({ id: this.state.data.id });
        this.handleCancel();
    }

    render() {
        const { currentTab } = this.state;
        const { firstName, lastName, email, gender, photo } = this.state.data;
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
                        <Typography align='center' variant='h4'>{firstName + ' ' + lastName}</Typography>
                    </div>
                    <AppBar position='static'>
                        <Tabs value={currentTab} onChange={this.handleChangeTab} aria-label="simple tabs example">
                            <Tab label='Mi perfil' id='tab-profile-view-edit' value='profile' />
                            <Tab label='Mis reseñas' id='tab-profile-reviews' value='reviews' />
                        </Tabs>
                    </AppBar>
                    {currentTab === 'profile' && this.renderProfile()}
                    {currentTab === 'reviews' && <div>TODO</div>}
                </div>
                {/* <button onClick={this.handleDelete}> Delete profile</button>
                {this.renderDelete()} */}
            </div>


        );
    }

    /**
     * Renders ProfileView or ProfileEdit
     */
    renderProfile() {
        const { editProfileMode, data, editVariable, getUserDataStatus } = this.state;
        if (editProfileMode) {
            return (
                <ProfileEdit
                    data={data}
                    editVariable={editVariable}
                    onCancel={this.handleCancel}
                // editProfileCallback={}
                />
            );
        } else {
            return (
                <ProfileView
                    data={data}
                    loading={getUserDataStatus === RequestStatus.LOADING}
                    error={getUserDataStatus === RequestStatus.ERROR}
                    onEdit={(type) => this.setState({ ...this.state, editProfileMode: true, editVariable: type })}
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
                onConfirm={this.deleteProfileTemp}
                onCancel={this.handleCancel}
                focusCancelBtn
            >
                You will not be able to login with this email!
            </SweetAlert>
        )
    }


}
