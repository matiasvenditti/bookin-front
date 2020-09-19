import React from 'react';
import { FormControl, InputLabel, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Flag from "react-world-flags";
import { allCountries } from '../../../utils/consts';
import './CountriesSelect.css';


interface CountriesSelectProps {
    label?: string,
    placeholder?: string,
    id: string,
    value: string,
    disabled?: boolean,
    error?: boolean,
    errorText?: string,
    onChange(id: string, type: string, value: string): void,
}

export const CountriesSelect = (props: CountriesSelectProps) => {
    const {
        label,
        placeholder,
        id,
        value,
        disabled,
        error,
        errorText,
    } = props;

    // value in AutoComplete is managed by 
    const myValue = allCountries.find(country => country.codename === value);

    // note: when error is true, error styles does not exist in <Autocomplete/>
    //      so it sets a className that in the css changes the border color
    //      manually.
    return (
        <FormControl fullWidth color='secondary' variant='outlined' className={error ? 'autocomplete-error' : ''} >
            {/* TODO: InputLabel no anda correctamente, se renderiza superpuesto a Autocomplete */}
            {/* <InputLabel id={`${id}-label`}>{label}</InputLabel> */}
            <Autocomplete
                color='error'
                disabled={disabled}
                id={id}
                // value note: empty NameCode to avoid undefined value and react 
                // giving controlled error
                value={myValue || {name: '', codename: ''}}
                options={allCountries}
                getOptionLabel={(option) => option.name}
                renderOption={(option, state) => (
                    <div className='countries-select-option-container'>
                        <Flag code={option.codename}/>
                        <Typography>{option.name}</Typography>
                    </div>
                )}
                renderInput={(params) => <TextField {...params} label={placeholder || ''} variant='outlined'/>}
                onChange={(e, value) => props.onChange(id, 'autocomplete-select', value?.codename || '')}
            />
            <Typography color='error'>{errorText}</Typography>
        </FormControl>
    )
}
