import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import './Login.css';
import LoginForm from './LoginForm';
import { LoginUser } from '../../../model/LoginUser';
import { login, ResponseLogin } from '../../../services/SessionService';
import { withRouter } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { saveLoginResponse } from '../../../services/AuthService';
import { RequestStatus } from '../../../model/consts/RequestStatus';


export interface LoginState {
    loginStatus: any,
    error: any,
}

class Login extends Component<any, LoginState> {
    constructor(props: any) {
        super(props)
        this.state = {
            loginStatus: RequestStatus.NONE,
            error: null,
        }
    }


    handleSubmit = (values: LoginUser) => {
        this.setState({ loginStatus: RequestStatus.LOADING, error: null });
        login(values)
            .then((response: AxiosResponse<ResponseLogin>) => {
                saveLoginResponse(response);
                this.props.loginCallback(RequestStatus.SUCCESS);
                this.setState({ loginStatus: RequestStatus.SUCCESS, error: null });
                this.props.history.push('/');
            })
            .catch((error) => {
                this.props.loginCallback(RequestStatus.ERROR);
                this.setState({ loginStatus: RequestStatus.ERROR, error });
            });
    }

    render() {
        const { loginStatus, error } = this.state;
        return (
            <div className='route-container'>
                <div className='card-container'>
                    <Typography align='center' variant='h4'>Ingresar</Typography>
                    <LoginForm
                        onSubmit={this.handleSubmit}
                        loading={loginStatus === RequestStatus.LOADING}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(Login)