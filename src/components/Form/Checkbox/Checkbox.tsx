import React, { Component } from 'react'
import { FormControlLabel, Checkbox as MaterialCheckbox } from '@material-ui/core';
import './Checkbox.css';

interface CheckboxProps {
    label: string,
    checked: boolean,
    error: boolean,
    errorText: string,
    onChange(e: any): void,
}

export default class Checkbox extends Component<CheckboxProps> {
    render() {
        const { label, checked, error, errorText } = this.props;
        return (
            <FormControlLabel
                label={label}
                control={
                    <MaterialCheckbox
                        value={checked}
                        color='secondary'
                    />
                }
            />
        )
    }
}
