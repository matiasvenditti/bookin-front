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

    renderValue = () => {
        const { title, loading, color } = this.props;
        if (loading) {
            if (color === 'primary') return <Loader mini color='secondary'/>
            else return <Loader mini/>
        } else {
            return title;
        }
    }

    render() {
        const { disabled, variant, color } = this.props;
        return (
            <MaterialButton
                color={color || 'secondary'}
                disabled={disabled}
                onClick={this.props.onClick}
                variant={variant}
            >{this.renderValue()}</MaterialButton>
        )
    }
}
