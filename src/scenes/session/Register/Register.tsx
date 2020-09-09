import React, { Component } from 'react';
import './Register.css';
import { Typography } from '@material-ui/core';
import { NewUser } from '../../../model';
import { register, login } from '../../../services/SessionService';
import { withRouter } from 'react-router-dom';
import { saveLoginResponse } from '../../../services/AuthService';
import { AxiosResponse } from 'axios';
import { ResponseLogin } from '../../../services/SessionService';
import RegisterForm from './RegisterForm';
import { RequestStatus } from '../../../model/consts/RequestStatus';


export interface RegisterState {
    registerStatus: any,
    error: any,
}

class Register extends Component<any, RegisterState> {
    constructor(props: any) {
        super(props)
        this.state = {
            registerStatus: RequestStatus.NONE,
            error: null,
        }
    }

    handleSubmit = (values: NewUser) => {
        this.setState({ registerStatus: RequestStatus.LOADING, error: null });
        register(values)
            .then(() => {
                this.setState({ registerStatus: RequestStatus.SUCCESS, error: null });
                login({ email: values.email, password: values.password })
                    .then((response: AxiosResponse<ResponseLogin>) => {
                        saveLoginResponse(response);
                        this.props.registerCallback(RequestStatus.SUCCESS, RequestStatus.SUCCESS);
                        this.props.history.push('/');
                        this.setState({ ...this.state, registerStatus: RequestStatus.SUCCESS });
                    })
                    .catch((error) => {
                        this.props.registerCallback(RequestStatus.SUCCESS, RequestStatus.ERROR)
                        this.props.history.push('/login');
                    });
            })
            .catch((error) => {
                this.setState({ registerStatus: RequestStatus.ERROR, error });
                this.props.registerCallback(RequestStatus.ERROR, RequestStatus.ERROR);
            });
    }

    render() {
        const { registerStatus } = this.state;
        return (
            <div className='route-container'>
                <div className='card-container-narrow'>
                    <Typography align='center' variant='h5'>Creá tu cuenta</Typography>
                    <RegisterForm
                        onSubmit={this.handleSubmit}
                        loading={registerStatus === RequestStatus.LOADING}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(Register);
