import React, { Component } from 'react'
import { Typography } from '@material-ui/core'

export default class Home extends Component {
    render() {
        return (
            <div className='route-container'>
                <div className='card-container'>
                    <Typography align='center' variant='h5'>Home</Typography>
                </div>
            </div>
        )
    }
}
