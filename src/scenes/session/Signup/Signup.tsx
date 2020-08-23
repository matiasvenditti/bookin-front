import React, { Component } from 'react';
// import './Register.css';
import { Typography } from '@material-ui/core';
import RegisterForm from './SignupForm';
import { NewUser } from '../../../model/NewUser';
import { register, ResponseRegister } from '../../../services/SessionService';
import { AxiosResponse } from 'axios';

export default class Register extends Component {


    handleSubmit = (values: NewUser) => {
        register(values)
            .then((response: AxiosResponse<ResponseRegister>) => console.log(response))
            .catch((error) => console.error(error));
    }

    render() {
        return (
            <div className='route-container'>
                <div className='card-container'>
                    <Typography align='center' variant='h5'>Creá tu cuenta</Typography>
                    <RegisterForm onSubmit={this.handleSubmit} />
                </div>
            </div>
        )
    }
}
