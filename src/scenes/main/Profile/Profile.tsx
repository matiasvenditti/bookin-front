import React, {Component} from 'react';
import {Image} from '@material-ui/icons';
import {EditVar} from '../../../model/consts/EditVar';
import {RequestStatus} from '../../../model/consts/RequestStatus';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';
import SweetAlert from "react-bootstrap-sweetalert/dist";
import {ResponseUpdate, update, deleteProfile, logout} from "../../../services/SessionService";
import {AxiosResponse} from "axios";
import {UserID} from "../../../model/UserID";


interface ProfileProps {

}

interface ProfileState {
    currentTab: string,
    tabs: string[],
    editProfileMode: boolean,
    getUserDataStatus: RequestStatus,
    editVariable: EditVar,
    updateStatus: any,
    deleteStatus: any,
    showDelete: boolean,
    data: any,
    error: any,
}

export default class Profile extends Component<any, ProfileState> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentTab: 'Mi perfil',
            tabs: ['Mi perfil', 'Mis reseñas'],
            editProfileMode: false,
            getUserDataStatus: RequestStatus.NONE,
            data: {
                id: 1,
                firstName: 'Juan Gabriel',
                lastName: 'Ricci',
                email: 'riccijuanga@gmail.com',
                gender: 'M',
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
        // getUserData()
        //     .then((response: any) => this.setState({ ...this.state, getUserDataStatus: RequestStatus.SUCCESS, data: response.data }))
        //     .catch((error: any) => this.setStatus({ ...this.state, getUserDataStatus: RequestStatus.ERROR, error }));
    }

    handleChangeTab = (e: any) => {
        this.setState({ ...this.state, currentTab: e.target.value });
    }

    handleCancel = () => {
        this.setState({editProfileMode : false, showDelete : false})
    };

    handleDelete = () => {
        this.setState({
            showDelete: !this.state.showDelete
        });
    }

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
                logout()
                this.props.history.push('/');
            })
            .catch((error) => {
                this.setState({ deleteStatus: RequestStatus.ERROR, error });
            });
    }

    deleteProfileTemp = () => {
        this.handleSubmit({
            id: this.state.data.id
        });
        this.handleCancel()


    }

    render() {
        // const { getUserDataStatus } = this.state;
        const { firstName, lastName, email, gender, photo } = this.state.data;
        return (
            <div className='route-container'>
                <div className='card-container'>
                    <div className='image-name-container'>
                        <Image />
                        {/*     <Typography align='center' variant='h4'>{firstName + ' ' + lastName}</Typography> */ }
                    </div>




                    {/* TODO AppBar Juanga */}
                    {/* <AppBar position="static">
                        <Tabs value={this.state.currentTab} onChange={this.handleChangeTab} aria-label="simple tabs example">
                            <Tab label="Item One" />
                            <Tab label="Item Two" />
                            <Tab label="Item Three" />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={'Mi Perfil'} tabIndex={0}> */}
                    {this.renderProfile()}
                    {/* </TabPanel>
                    <TabPanel value={'Mis Reseñas'} tabIndex={0}>
                        // TODO future feature :P
                    </TabPanel> */}
                </div>
                <button onClick={this.handleDelete}> Delete profile</button>
                {this.renderDelete()}
            </div>


        );
        // if (getUserDataStatus === RequestStatus.LOADING) {
        //     return (
        //         <div className='route-container'>
        //             <div className='card-container'>
        //                 <div className='image-name-container'>
        //                     <Image />
        //                     <Skeleton />
        //                     <Typography align='center' variant='h4'>{}</Typography>
        //                 </div>
        //             </div>
        //         </div>
        //     );
        // } else if (getUserDataStatus === RequestStatus.ERROR) {

        // } else {
        //     const { firstName, lastName, email, gender, photo } = this.state.data;
        //     return (
        //         <div className='route-container'>
        //             <div className='card-container'>
        //                 <div className='image-name-container'>
        //                     <Image />
        //                     <Typography align='center' variant='h4'>{firstName + ' ' + lastName}</Typography>
        //                 </div>

        //             </div>
        //         </div>
        //     );
        // }
    }

    /**
     * Renders ProfileView or ProfileEdit
     */
    renderProfile() {
        const { editProfileMode } = this.state;
        if (editProfileMode) return <ProfileEdit data={this.state.data} editVariable={this.state.editVariable} onCancel={this.handleCancel}  />
        else return <ProfileView  data={this.state.data}/>
    }

    renderDelete(){
        const {showDelete} = this.state;
        if(showDelete) return (
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
