import React, { Component } from 'react';
import { EditVar } from '../../../model/consts/EditVar';
import { RequestStatus } from '../../../model/consts/RequestStatus';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';
import { Typography, Tabs, Tab, AppBar } from '@material-ui/core';
import { dummyAvatar } from '../../../assets';
import './Profile.css'
import HoverableAvatar from '../../../components/HoverableAvatar/HoverableAvatar';
import { getUserData, updateProfile, deleteProfile, ResponseUpdate } from '../../../services/UserService';
import { logout } from "../../../services/SessionService";
import { AxiosResponse } from "axios";
import { DeleteUserModal } from './DeleteUserModal';
import { User } from '../../../model';
import Gender from '../../../model/Gender';
import { withRouter } from 'react-router-dom';
import photoUtils from '../../../utils/photoUtils';


interface ProfileProps {
    editProfileCallback(editProfileStatus: RequestStatus): void,
    onLoadErrorCallback(): void,
    deleteProfileCallback(deleteProfileStatus: RequestStatus): void,
}

interface ProfileState {
    currentTab: string,
    editProfileMode: boolean,
    getUserDataStatus: RequestStatus,
    editVariable: EditVar,
    updateStatus: any,
    deleteStatus: any,
    deleteModalShow: boolean,
    data: User,
}

class Profile extends Component<any, ProfileState> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentTab: 'profile',
            editProfileMode: false,
            getUserDataStatus: RequestStatus.NONE,
            data: {
                id: -1,
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                gender: Gender.A,
                photo: null,
            },
            deleteModalShow: false,
            updateStatus: RequestStatus.NONE,
            deleteStatus: RequestStatus.NONE,
            editVariable: EditVar.PASSWORD,
        }
    }

    _getUserData() {
        getUserData()
            .then((response: any) => {
                console.log('response profile', response);
                this.setState({
                    ...this.state,
                    getUserDataStatus: RequestStatus.SUCCESS,
                    data: {
                        ...response.data,
                        photo: photoUtils.getPhotoFromBytearray(response.data.photo),
                    }
                });
            })
            .catch((error: any) => this.setState({ ...this.state, getUserDataStatus: RequestStatus.ERROR }));
    }

    componentDidMount() {
        this.setState({ ...this.state, getUserDataStatus: RequestStatus.LOADING });
        this._getUserData();
    }

    handleChangeTab = (e: any, newValue: any) => {
        this.setState({ ...this.state, currentTab: newValue });
    }

    handleCancel = () => {
        this.setState({ ...this.state, editProfileMode: false, deleteModalShow: false })
    };

    handleDeleteConfirm = () => {
        this.setState({ ...this.state, deleteStatus: RequestStatus.LOADING });
        deleteProfile(this.state.data.id)
            .then((response: AxiosResponse<ResponseUpdate>) => {
                // TODO call ToastContainer (context feature to be implemented)
                this.setState({ ...this.state, deleteStatus: RequestStatus.SUCCESS });
                logout();
                this.props.history.push('/');
            })
            .catch((error) => {
                this.setState({ ...this.state, deleteStatus: RequestStatus.ERROR });
            });
    }

    handleUpdatePhoto = (photo: File) => {
        this.handleUpdate(this.state.data, photo);
    }
    handleUpdateValues = (values: User) => this.handleUpdate(values, this.state.data.photo);

    handleUpdate = (values: User, photo: File) => {
        this.setState({ ...this.state, updateStatus: RequestStatus.LOADING });
        updateProfile(this.state.data.id, values, photo)
            .then((response: AxiosResponse<ResponseUpdate>) => {
                this.setState({ ...this.state, updateStatus: RequestStatus.SUCCESS, editProfileMode: false });
                this.props.editProfileCallback(RequestStatus.SUCCESS);
                this._getUserData();
            })
            .catch((error) => {
                this.setState({ ...this.state, updateStatus: RequestStatus.ERROR });
                this.props.editProfileCallback(RequestStatus.ERROR);
            });
    }

    render() {
        const { currentTab, deleteStatus, deleteModalShow } = this.state;
        const { firstName, lastName } = this.state.data;
        return (
            <div className='route-container'>
                <div className='card-container'>
                    <div className='image-name-container'>
                        <HoverableAvatar
                            src={this.state.data.photo || dummyAvatar}
                            id=''
                            maxSize={100000}
                            onChange={this.handleUpdatePhoto}
                            onLoadError={this.props.onLoadErrorCallback}
                        />
                        <Typography align='center' variant='h4'>{firstName + ' ' + lastName}</Typography>
                    </div>
                    <AppBar position='static'>
                        <Tabs value={currentTab} onChange={this.handleChangeTab} aria-label='simple tabs example'>
                            <Tab label='Mi perfil' id='tab-profile-view-edit' value='profile' />
                            <Tab label='Mis reseñas' id='tab-profile-reviews' value='reviews' />
                        </Tabs>
                    </AppBar>
                    {currentTab === 'profile' && this.renderProfile()}
                    {currentTab === 'reviews' && <div>TODO</div>}
                    <DeleteUserModal
                        open={deleteModalShow}
                        loading={deleteStatus === RequestStatus.LOADING}
                        onConfirm={this.handleDeleteConfirm}
                        onCancel={this.handleCancel}
                    />
                </div>
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
                    loading
                    error
                    data={data}
                    editVariable={editVariable}
                    onSubmit={this.handleUpdateValues}
                    onCancel={this.handleCancel}
                />
            );
        } else {
            return (
                <ProfileView
                    data={data}
                    loading={getUserDataStatus === RequestStatus.LOADING}
                    error={getUserDataStatus === RequestStatus.ERROR}
                    onEdit={(type) => this.setState({ ...this.state, editProfileMode: true, editVariable: type })}
                    // onChangePassword={() => this.setState({...})}
                    onChangePassword={() => console.log('on change password recibed (WIP)')}
                    onDeleteUser={() => this.setState({ ...this.state, deleteModalShow: true })}
                />
            );
        }
    }
}


export default withRouter(Profile);
