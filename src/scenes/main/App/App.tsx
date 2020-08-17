import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Routes from '../Routes/Routes';
import { refreshToken } from '../../../services/mainServices';
import RequestStatus from '../../../model/RequestStatus';
import { Button } from '@material-ui/core';

interface AppState {
    token: string | null,
    role: string | null,
    isLoggedIn: boolean,
    loginStatus: Object,
    // refreshTokenStatus: Object,
    // profile: {},
    // getProfileStatus: Object,
}

interface AppProps {
    history: any,
}

const initialState: AppState = {
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    isLoggedIn: false,
    loginStatus: RequestStatus.none,
    // refreshTokenStatus: RequestStatus.none,
    // profile: {},
    // getProfileStatus: RequestStatus.none,

    // mas categorias de datos...
    // registerStatus: REQUEST_STATUS.NONE,
}

export default class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        const { token } = this.state;
        // refresh token
        if (token) refreshToken(token);
    }

    render() {
        const {
            isLoggedIn,

        } = this.state;
        
        return (
            <div className='app-container'>
                <Navbar isLoggedIn={isLoggedIn} locationPathname={this.props.history.location.pathname} />
                <Routes isLoggedIn={isLoggedIn} />
            </div>
        )
    }
}
