import React, { Component } from 'react'
import { TextField, IconButton, InputAdornment } from '@material-ui/core';
// import { Visibility, VisibilityOff } from '@material-ui/icons';
import './Input.css';

interface InputProps {
    label: string,
    id: string,
    type: string,
    value: any,
    error: boolean,
    errorText: string,
    required?: boolean,
    autoFocus?: boolean,
    onChange(e: any): void,
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
                        {/* {showPassword ? <Visibility /> : <VisibilityOff />} */}
                    </IconButton>
                </InputAdornment>
            );
        } return null;
    }

    render() {
        const { label, id, type, value, error, errorText, required, autoFocus } = this.props;
        return (
            <TextField
                variant='outlined'
                color='secondary'
                fullWidth
                // autoComplete="name"
                label={label}
                name={id}
                id={id}
                type={type}
                value={value}
                error={error}
                helperText={errorText}
                required={required}
                autoFocus={autoFocus}
                onChange={(e) => this.props.onChange(e)}
                InputProps={{ endAdornment: this.getPasswordEndAdornment() }}
            />
        )
    }
}
