import React, { Component } from 'react';
import { Button as MaterialButton } from '@material-ui/core';
import './Button.css';

interface ButtonProps {
    title: string,
    disabled: boolean,
    onClick(): void,
}

export default class Button extends Component<ButtonProps> {
    render() {
        const { title, disabled } = this.props;
        return (
            <MaterialButton
                fullWidth
                variant='contained'
                color='secondary'
                disabled={disabled}
                onClick={this.props.onClick}
            >{title}</MaterialButton>
        )
    }
}
