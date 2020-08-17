import React, { Component } from 'react'
import { Typography } from '@material-ui/core'
import LoginForm from '../LoginForm/LoginForm'

export default class Login extends Component {
    render() {
        return (
            <div>
                <Typography>Login</Typography>
                <LoginForm/>
            </div>
        )
    }
}
