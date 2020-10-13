import React, { useEffect } from 'react';
import { Chip, FormControl, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Flag from "react-world-flags";
import { allCountries } from '../../../utils/consts';
import './CountriesSelect.css';
import { KeyValue } from '../../../model';


interface CountriesSelectProps {
    label?: string,
    placeholder?: string,
    id: string,
    value: any,
    disabled?: boolean,
    error?: boolean,
    errorText?: string,
    multiple?: boolean,
    onChange(id: string, type: string, value: any): void,
}

const CountriesSelect = (props: CountriesSelectProps) => {
    const {
        // label,
        placeholder,
        id,
        value,
        disabled,
        error,
        errorText,
        multiple,
    } = props;

    useEffect(() => {}, [value])

    if (multiple) {
        // console.log('multiple country select', props);
        // value in AutoComplete is managed by 
        const myValue = allCountries.filter(country => value.includes(country.key) && country.key);
        return (
            <FormControl fullWidth color='secondary' variant='outlined' className={error ? 'autocomplete-error' : ''} >
                <Autocomplete
                    multiple
                    id={id}
                    value={myValue || {value: '', key: ''}}
                    options={allCountries}
                    getOptionLabel={(option) => option.value}
                    defaultValue={[]}
                    onChange={(e, value) => props.onChange(id, 'autocomplete-select', value?.map((v: any) => v.key) || '')}
                    filterSelectedOptions
                    disabled={disabled}
                    renderOption={(option, state) => (
                        <div className='countries-select-option-container'>
                            <Flag code={option.key}/>
                            <Typography>{option.value}</Typography>
                        </div>
                    )}                    
                    renderInput={(params) => <TextField {...params} label={placeholder || ''} variant='outlined'/>}
                    renderTags={(values: KeyValue[], getTagProps: any) => {
                        console.log('tags', value);
                        return (
                            <div className=''>
                                {values.map((item, i) => (
                                    <Chip
                                        key={'country-select-chip-' + (multiple ? 'multiple-' : '-') + i}
                                        avatar={<Flag style={{borderRadius: 50}} code={item.key}/>}
                                        label={item.value}
                                    />
                                ))}
                            </div>
                        )
                    }}
                />
            </FormControl>
        );
    } else {
        // value in AutoComplete is managed by 
        const myValue = allCountries.find(country => country.key === value);
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
                    // value note: empty KeyValue to avoid undefined value and react 
                    // giving controlled error
                    value={myValue || {value: '', key: ''}}
                    options={allCountries}
                    getOptionLabel={(option) => option.value}
                    renderOption={(option, state) => (
                        <div className='countries-select-option-container'>
                            <Flag code={option.key}/>
                            <Typography>{option.value}</Typography>
                        </div>
                    )}
                    renderInput={(params) => <TextField {...params} label={placeholder || ''} variant='outlined'/>}
                    onChange={(e, value) => props.onChange(id, 'autocomplete-select', value?.key || '')}
                />
                <Typography color='error'>{errorText}</Typography>
            </FormControl>
        );
    }
}


export default CountriesSelect;
