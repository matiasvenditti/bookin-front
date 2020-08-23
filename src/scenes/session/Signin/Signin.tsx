import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import SigninForm from './SigninForm';
import './Signin.css';


export default class Signin extends Component {
    render() {
        return (
            <div className='route-container'>
                <div className='card-container'>
                    <Typography align='center' variant='h4'>Ingresar</Typography>
                    <SigninForm />
                </div>
            </div>
        )
    }
}
