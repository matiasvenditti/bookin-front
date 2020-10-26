import React, { Component } from 'react'
import { FormControl, FormLabel, RadioGroup as MaterialRadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import './RadioGroup.css';
import { KeyValue } from '../../../model';

interface RadioGroupProps {
    title: string,
    id: string,
    type: string,
    valueId: any, // id of element
    options: KeyValue[],
    error: boolean,
    errorText: string,
    disabled?: boolean,
    column?: boolean,
    onChange(id: string, type: string, value: any): void,
}

interface RadioGroupState {

}

export default class RadioGroup extends Component<RadioGroupProps, RadioGroupState> {
    render() {
        const { title, id, type, valueId, options, error, errorText, disabled, column } = this.props;
        return (
            <FormControl
                component='fieldset'
                className={column ? 'radio-group-form-control-container-column'
                    : 'radio-group-form-control-container'}
                disabled={disabled}
            >
                <FormLabel component='legend' color='secondary'>{title}</FormLabel>
                <MaterialRadioGroup
                    className='radio-group-container'
                    aria-label="gender"
                    value={valueId}
                    onChange={(e) => this.props.onChange(id, type, e.target.value)} // e.target.value = option.key
                >
                    {options.map((option, i) => (
                        <FormControlLabel
                            key={'radio-group-form-control-label-' + i}
                            value={option.key}
                            label={option.value}
                            control={<Radio />}
                        />
                    ))}
                </MaterialRadioGroup>
                <FormLabel component='legend' error={error}>{error && errorText}</FormLabel>
            </FormControl>
        )
    }
}
