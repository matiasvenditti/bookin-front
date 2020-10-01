import React, { Component } from 'react';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';
import { Typography, Tabs, Tab, AppBar } from '@material-ui/core';
import './Profile.css'
import { AxiosResponse } from "axios";
import { DeleteUserModal } from './DeleteUserModal';
import { withRouter } from 'react-router-dom';
import { RequestStatus } from '../../model/consts/RequestStatus';
import { EditVar } from '../../model/consts/EditVar';
import { User } from '../../model';
import Gender from '../../model/Gender';
import ResponseUpdate from '../../model/responses/ResponseUpdate';
import { SessionService, UserService } from '../../services';
import HoverableAvatar from '../../components/Photo/HoverableAvatar/HoverableAvatar';
import { dummyAvatar } from '../../assets';
import { PhotoUtils } from '../../utils';


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
        UserService.getUserData()
            .then((response: any) => {
                this.setState({
                    ...this.state,
                    getUserDataStatus: RequestStatus.SUCCESS,
                    data: {
                        ...response.data,
                        photo: PhotoUtils.getPhotoFromBytearray(response.data.photo),
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
        UserService.deleteProfile(this.state.data.id)
            .then((response: AxiosResponse<ResponseUpdate>) => {
                // TODO call ToastContainer (context feature to be implemented)
                this.setState({ ...this.state, deleteStatus: RequestStatus.SUCCESS });
                SessionService.logout();
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
        UserService.updateProfile(this.state.data.id, values, photo)
            .then((response: AxiosResponse<ResponseUpdate>) => {
                this.setState({ ...this.state, updateStatus: RequestStatus.SUCCESS, editProfileMode: false });
                this.props.editProfileCallback(RequestStatus.SUCCESS);
                this._getUserData();
            })
            .catch((error: any) => {
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
