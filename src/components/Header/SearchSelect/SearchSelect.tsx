import { FormControl, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { SelectGroupedOptions } from '../../../model/SelectGroupedOptions';
import './SearchSelect.css';


interface SearchSelectProps {
    value: string,
    placeholder: string,
    id: string,
    loading: boolean,
    disabled?: boolean
    loadingOptions?: boolean,
    error: boolean
    errorText: string,
    bookOptions: SelectGroupedOptions[],
    authorOptions: SelectGroupedOptions[],
    onChange(id: string, type: string, value: string): void,
}

export const SearchSelect = (props: SearchSelectProps) => {
    const {
        value,
        placeholder,
        id,
        loading,
        disabled,
        loadingOptions,
        error,
        errorText,
        bookOptions,
        authorOptions,
    } = props;

    return (
        <FormControl fullWidth color='secondary' variant='outlined' className={'search-select-form-control'} >
            {/* TODO: InputLabel no anda correctamente, se renderiza superpuesto a Autocomplete */}
            {/* <InputLabel id={`${id}-label`}>{label}</InputLabel> */}
            <Autocomplete
                color='primary'
                disabled={disabled}
                id={id}
                // value note: empty NameCode to avoid undefined value and react 
                // giving controlled error
                value={{type: '', value}}
                options={bookOptions.concat(authorOptions)}
                groupBy={(option) => option.type}
                getOptionLabel={(option) => option.value}
                renderOption={(option, state) => (
                    <div className='select-option-container'>
                        <Typography>{option.value}</Typography>
                    </div>
                )}
                renderInput={(params) => <TextField {...params} label={placeholder || ''} variant='outlined'/>}
                onChange={(e, value: any) => props.onChange(id, 'autocomplete-select', value && value.toString())}
            />
            <Typography color='error'>{errorText}</Typography>
        </FormControl>
    )
}
