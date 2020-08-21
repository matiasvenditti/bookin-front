import React, { Component } from 'react'
import { TextField, IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import './Input.css';
import { Form } from '../../../model';

interface InputProps {
    id: keyof Form,
    label: string,
    type: string,
    value: any,
    error: boolean,
    errorText: string,
    required?: boolean,
    autoFocus?: boolean,
    onChange(id: keyof Form, type: string, value: any): void,
}

interface InputState {
    showPassword: boolean,
}

export default class Input extends Component<InputProps, InputState> {
    constructor(props: InputProps) {
        super(props);
        this.state = { showPassword: false } // if type is not password this is useless
    }

    handleShowPassword = (value: boolean) => {
        this.setState({ showPassword: value });
    }

    getPasswordEndAdornment() {
        const type = this.props.type;
        if (type === 'password') {
            const showPassword = this.state.showPassword;
            return (
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => this.handleShowPassword(true)}
                        onMouseDown={() => this.handleShowPassword(true)}
                    >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
            );
        } return null;
    }

    render() {
        const { label, id, type, value, error, errorText, required, autoFocus } = this.props;
        return (
            <div className='form-input-container'>
                <TextField
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    // autoComplete="name"
                    label={label}
                    type={type}
                    value={value}
                    error={error}
                    helperText={errorText}
                    required={required}
                    autoFocus={autoFocus}
                    onChange={(e) => this.props.onChange(id, type, e.target.value)}
                    InputProps={{ endAdornment: this.getPasswordEndAdornment() }}
                />
            </div>
        )
    }
}
