import React, { Component } from 'react'
import { FormControl, FormLabel, RadioGroup as MaterialRadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import './RadioGroup.css';

interface RadioGroupProps {
    title: string,
    id: string,
    type: string,
    valueId: number, // id of element
    options: { id: number, value: string }[],
    error: boolean,
    errorText: string,
    disabled?: boolean,
    onChange(id: string, type: string, value: any): void,
}

interface RadioGroupState {

}

export default class RadioGroup extends Component<RadioGroupProps, RadioGroupState> {
    render() {
        const { title, id, type, valueId, options, error, errorText, disabled } = this.props;
        return (
            <FormControl component='fieldset' className='radio-group-form-control-container' disabled={disabled}>
                <FormLabel component='legend' color='secondary'>{title}</FormLabel>
                <MaterialRadioGroup
                    className='radio-group-container'
                    aria-label="gender"
                    value={valueId}
                    onChange={(e) => this.props.onChange(id, type, parseInt(e.target.value))}
                >
                    {options.map((option, i) => (
                        <FormControlLabel
                            key={'radio-group-form-control-label-' + i}
                            value={option.id}
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
