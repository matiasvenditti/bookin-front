import React, { Component } from 'react';
import './Loader.css';
import { CircularProgress } from '@material-ui/core';


interface LoaderProps {
    disabled?: boolean,
    mini?: boolean,
}

export default class Loader extends Component<LoaderProps, {}> {
    render() {
        const { disabled, mini } = this.props;
        return (
            <div className='loader-container'>
                {!disabled && <CircularProgress size={mini ? 20 : 50} />}
            </div>
        )
    }
}
