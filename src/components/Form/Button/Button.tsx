import React, { Component } from 'react';
import { Button as MaterialButton } from '@material-ui/core';
import './Button.css';
import Loader from '../../Loader/Loader';

interface ButtonProps {
    title: string,
    disabled: boolean,
    loading?: boolean,
    onClick(): void,
}

export default class Button extends Component<ButtonProps> {
    render() {
        const { title, disabled, loading } = this.props;
        return (
            <MaterialButton
                variant='contained'
                color='secondary'
                disabled={disabled}
                onClick={this.props.onClick}
            >{loading ? <Loader mini /> : title}</MaterialButton>
        )
    }
}
