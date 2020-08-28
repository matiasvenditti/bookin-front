import React, { Component } from 'react';
import './Signup.css';
import { Typography } from '@material-ui/core';
import SignupForm from './SignupForm';
import { NewUser } from '../../../model/NewUser';
import { register } from '../../../services/SessionService';
import { withRouter } from 'react-router-dom';


class Register extends Component<any, {}> {
    handleSubmit = (values: NewUser) => {
        register(values, this.props.history);
        this.props.registerCallback()
    }

    render() {
        return (
            <div className='route-container'>
                <div className='card-container'>
                    <Typography align='center' variant='h5'>Creá tu cuenta</Typography>
                    <SignupForm onSubmit={this.handleSubmit} />
                </div>
            </div>
        )
    }
}

export default withRouter(Register);
