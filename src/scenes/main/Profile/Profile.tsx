import React, {Component} from 'react';
import {Image} from '@material-ui/icons';
import {EditVar} from '../../../model/consts/EditVar';
import {RequestStatus} from '../../../model/consts/RequestStatus';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';


interface ProfileProps {

}

interface ProfileState {
    currentTab: string,
    tabs: string[],
    editProfileMode: boolean,
    getUserDataStatus: RequestStatus,
    editVariable: EditVar,
    updateStatus: any,
    data: any,
    error: any,
}

export default class Profile extends Component<any, ProfileState> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentTab: 'Mi perfil',
            tabs: ['Mi perfil', 'Mis reseñas'],
            editProfileMode: true,
            getUserDataStatus: RequestStatus.NONE,
            data: {
                firstName: 'Juan Gabriel',
                lastName: 'Ricci',
                email: 'riccijuanga@gmail.com',
                gender: 'M',
                photo: null,
            },
            updateStatus: RequestStatus.NONE,
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
        this.setState({editProfileMode : false})
    };

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
}
