import React, { Component } from 'react';
import { Button as MaterialButton } from '@material-ui/core';
import './Button.css';
import Loader from '../../Loader/Loader';

interface ButtonProps {
    title: string,
    disabled: boolean,
    loading?: boolean,
    variant?: "text" | "outlined" | "contained" | undefined,
    onClick(): void,
    color?: "inherit" | "primary" | "secondary" | "default" | undefined,
}

export default class Button extends Component<ButtonProps> {
    render() {
        const { title, disabled, loading, variant, color } = this.props;
        return (
            <MaterialButton
                color={color || 'secondary'}
                disabled={disabled}
                onClick={this.props.onClick}
                variant={variant}
            >{loading ? <Loader mini /> : title}</MaterialButton>
        )
    }
}
