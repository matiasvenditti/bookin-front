import React, { Component } from 'react'
import { Typography } from '@material-ui/core'

export default class Profile extends Component {
    render() {
        return (
            <div className='route-container'>
                <div className='card-container'>
                    <Typography align='center' variant='h5'>Profile</Typography>
                </div>
            </div>
        )
    }
}
