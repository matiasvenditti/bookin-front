import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import './Login.css';
import LoginForm from './LoginForm';
import { LoginUser } from '../../../model/LoginUser';
import { login } from '../../../services/SessionService';
import { withRouter } from 'react-router-dom';


class Login extends Component<any, {}> {
    handleSubmit = (values: LoginUser) => {
        login(values, this.props.history);
        this.props.loginCallback();
    }

    render() {
        return (
            <div className='route-container'>
                <div className='card-container'>
                    <Typography align='center' variant='h4'>Ingresar</Typography>
                    <LoginForm onSubmit={this.handleSubmit} />
                </div>
            </div>
        )
    }
}

export default withRouter(Login)