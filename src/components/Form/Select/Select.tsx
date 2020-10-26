import React from 'react'
import { FormControl, InputLabel, Select as MaterialSelect, MenuItem } from '@material-ui/core'
import { KeyValue } from '../../../model';


interface SelectProps {
    label?: string,
    id: string,
    value: string,
    options: KeyValue[],
    disabled?: boolean,
    onChange(id: string, type: string, value: string): void,
}

const Select = (props: SelectProps) => {
    const {
        label,
        id,
        value,
        options,
        disabled,
    } = props;
    return (
        <FormControl required fullWidth color='secondary' variant='outlined'>
            <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
            <MaterialSelect
                labelId='demo-simple-select-label'
                id={id}
                type='select'
                name={id}
                value={value}
                onChange={(e: any) => props.onChange(id, 'select', e.target.value)}
                label="Nacionalidad"
                disabled={disabled}
            >
                {options.map((option: KeyValue, i: number) =>
                    <MenuItem value={option.key} key={'select-option-' + i}>{option.value}</MenuItem>)
                }
            </MaterialSelect>
        </FormControl>
    )
}


export default Select;
