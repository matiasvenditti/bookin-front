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
            updateStatus: RequestStatus.NONE,
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
        this.setState({ editProfileMode: false })
    };

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
                    {/* TODO AppBar Juanga */}
                    <AppBar position='static'>
                        <Tabs value={currentTab} onChange={this.handleChangeTab} aria-label="simple tabs example">
                            <Tab label='Mi perfil' id='tab-profile-view-edit' value='profile' />
                            <Tab label='Mis reseñas' id='tab-profile-reviews' value='reviews' />
                        </Tabs>
                    </AppBar>
                    {currentTab === 'profile' && this.renderProfile()}
                    {currentTab === 'reviews' && <div>TODO</div>}
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
}
