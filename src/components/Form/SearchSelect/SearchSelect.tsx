import { FormControl, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import './SearchSelect.css';


interface SearchSelectProps {
    value: string,
    placeholder: string,
    id: string,
    disabled?: boolean
    loadingOptions?: boolean,
    error: boolean
    errorText: string,
    onChange(id: string, type: string, value: string): void,
}

export const SearchSelect = (props: SearchSelectProps) => {
    const {
        value,
        placeholder,
        id,
        disabled,
        loadingOptions,
        error,
        errorText,
    } = props;

    return (
        <FormControl fullWidth color='secondary' variant='outlined' className={'search-select-form-control'} >
            {/* TODO: InputLabel no anda correctamente, se renderiza superpuesto a Autocomplete */}
            {/* <InputLabel id={`${id}-label`}>{label}</InputLabel> */}
            <Autocomplete
                color='error'
                disabled={disabled}
                id={id}
                // value note: empty NameCode to avoid undefined value and react 
                // giving controlled error
                value={value}
                options={['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff']}
                getOptionLabel={(value) => value}
                renderOption={(option, state) => (
                    <div className='countries-select-option-container'>
                        <Typography>{option}</Typography>
                    </div>
                )}
                ListboxComponent={(option, state) => (
                    <div>
                        <Typography>LIST BOX A</Typography>
                        <Typography>{option}</Typography>
                        <Typography>LIST BOX B</Typography>
                    </div>
                )}
                renderInput={(params) => <TextField {...params} label={placeholder || ''} variant='outlined'/>}
                onChange={(e, value: any) => props.onChange(id, 'autocomplete-select', value && value.toString())}
            />
            <Typography color='error'>{errorText}</Typography>
        </FormControl>
    )
}
