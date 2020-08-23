import React, { Component } from 'react'
import { FormControl, FormLabel, RadioGroup as MaterialRadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import './RadioGroup.css';
import { Form } from '../../../model';

interface RadioGroupProps {
    title: string,
    id: keyof Form,
    type: string,
    value: string,
    options: string[],
    error: boolean,
    errorText: string,
    onChange(id: keyof Form, type: string, value: any): void,
}

interface RadioGroupState {

}

export default class RadioGroup extends Component<RadioGroupProps, RadioGroupState> {
    render() {
        const { title, id, type, value, options, error, errorText } = this.props;
        return (
            <FormControl component='fieldset' className='radio-group-form-control-container'>
                <FormLabel component='legend' color='secondary'>{title}</FormLabel>
                <MaterialRadioGroup
                    className='radio-group-container'
                    aria-label="gender"
                    value={value}
                    onChange={(e) => this.props.onChange(id, type, e.target.value)}
                >
                    {options.map((option, i) => (
                        <FormControlLabel key={'radio-group-form-control-label-' + i} value={option} control={<Radio />} label={option} />
                    ))}
                </MaterialRadioGroup>
                <FormLabel component='legend' error={error}>{error && errorText}</FormLabel>
            </FormControl>
        )
    }
}
