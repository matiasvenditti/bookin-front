import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import classes from './Login.module.css';
import LoginForm from './LoginForm';
import { LoginUser } from '../../../model/LoginUser';
import { withRouter } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { RequestStatus } from '../../../model/consts/RequestStatus';
import { AuthService, SessionService } from '../../../services';
import ResponseLogin from '../../../model/responses/ResponseLogin';
import RecoverPasswordForm from './RecoverPasswordForm';


export interface LoginState {
    loginStatus: RequestStatus,
    passwordRecoveryStatus: RequestStatus
    error: any,
    doRecover: boolean,
}

class Login extends Component<any, LoginState> {
    constructor(props: any) {
        super(props)
        this.state = {
            loginStatus: RequestStatus.NONE,
            passwordRecoveryStatus: RequestStatus.NONE,
            error: null,
            doRecover: false,
        }
    }

    handleSubmit = (values: LoginUser) => {
        this.setState({ loginStatus: RequestStatus.LOADING, error: null });
        SessionService.login(values)
            .then((response: AxiosResponse<ResponseLogin>) => {
            AuthService.saveLoginResponse(response);
                this.props.loginCallback(RequestStatus.SUCCESS);
                this.setState({ ...this.state, loginStatus: RequestStatus.SUCCESS, error: null });
                this.props.history.push('/');
            })
            .catch((error: any) => {
                this.props.loginCallback(RequestStatus.ERROR);
                this.setState({ ...this.state, loginStatus: RequestStatus.ERROR, error });
            });
    }

    handlePasswordRecover = (email: string) => {
        this.setState({ passwordRecoveryStatus: RequestStatus.LOADING });
        SessionService.passwordRecovery(email)
            .then((response: any) => {
                this.props.passwordRecoveryCallback(RequestStatus.SUCCESS);
                this.setState({...this.state, passwordRecoveryStatus: RequestStatus.SUCCESS});
            })
            .catch((error: any) => {
                this.props.passwordRecoveryCallback(RequestStatus.ERROR);
                this.setState({...this.state, passwordRecoveryStatus: RequestStatus.ERROR});
            })
    }

    render() {
        const { loginStatus, passwordRecoveryStatus } = this.state;
        return (
            <div className='route-container'>
                <div className='card-container-narrow'>
                    <Typography align='center' variant='h4'>Ingresar</Typography>
                    {!this.state.doRecover ? 
                        <LoginForm
                            onSubmit={this.handleSubmit}
                            loading={loginStatus === RequestStatus.LOADING}
                            onPasswordRecover={() => this.setState({...this.state, doRecover: true})}
                        />
                        :
                        <RecoverPasswordForm
                            onCancel={() => this.setState({...this.state, doRecover: false})}
                            onSubmit={this.handlePasswordRecover}
                            loading={passwordRecoveryStatus === RequestStatus.LOADING}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Login)