import React, { Component } from 'react'
import { FormControlLabel, Checkbox as MaterialCheckbox, FormLabel } from '@material-ui/core';
import './Checkbox.css';

interface CheckboxProps {
    id: string,
    label?: string,
    checked: boolean,
    type: string,
    error: boolean,
    errorText: string,
    disabled?: boolean,
    onChange(id: string, type: string, value: any): void,
}

export default class Checkbox extends Component<CheckboxProps> {
    render() {
        const { id, label, checked, type, error, errorText, disabled } = this.props;
        return (
            <div className='form-checkbox-container'>
                <FormControlLabel
                    label={label}
                    disabled={disabled}
                    control={
                        <MaterialCheckbox
                            value={checked}
                            color='secondary'
                            onChange={(e) => this.props.onChange(id, type, e.target.checked)}
                        />
                    }
                />
                <FormLabel error={error}>{error && errorText}</FormLabel>
            </div>
        )
    }
}
