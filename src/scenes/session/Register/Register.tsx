import React, { Component } from 'react';
// import './Register.css';
import { Typography } from '@material-ui/core';
import RegisterForm from './RegisterForm';
import { NewUser } from '../../../model/NewUser';
import { register } from '../../../services/SessionService';

export default class Register extends Component {


    handleSubmit = (values: NewUser) => {
        register(values)
            .then((response: NewUser) => console.log(response))
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <div className='route-container'>
                <div className='card-container'>
                    <Typography align='center' variant='h4'>Creá tu cuenta</Typography>
                    <RegisterForm onSubmit={this.handleSubmit} />
                </div>
            </div>
        )
    }
}
