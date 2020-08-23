import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import './Login.css';
import LoginForm from './LoginForm';
import { LoginUser } from '../../../model/LoginUser';
import { login } from '../../../services/SessionService';


export default class Signin extends Component {
    handleSubmit = (values: LoginUser) => login(values);

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
