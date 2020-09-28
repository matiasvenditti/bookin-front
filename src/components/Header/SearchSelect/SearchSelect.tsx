import { FormControl, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import classes from './SearchSelect.module.css';


// TODO: pasar a modelos correctamente
interface ValueType {
    value: any, // Book o Author
    type: string, // 'Libros' o 'Autores'
}

interface SearchSelectProps extends RouteComponentProps {
    inputValue: string,
    placeholder: string,
    id: string,
    disabled?: boolean
    loadingOptions?: boolean,
    loading: boolean
    // error: boolean
    // errorText: string,
    options: ValueType[],
    onQueryChange(value: string): void,
}

const SearchSelect = (props: SearchSelectProps) => {
    const {
        inputValue,
        placeholder,
        id,
        disabled,
        loading,
        // error,
        // loadingOptions,
        options,
    } = props;

    const getOptionValue = (option: ValueType) => {
        if (option.type === 'Libros') {
            return option.value.title;
        } else {
            return (option.value.firstName + ' ' + option.value.lastName);
        }
    }

    const handleRedirect = (option: ValueType) => {
        if (option.type === 'Libros') {
            props.history.push(`/books/${option.value.id}`);
        } else {
            props.history.push(`/authors/${option.value.id}`);
        }
    }

    return (
        <FormControl fullWidth color='secondary' variant='outlined' className={classes.searchSelectFormControl} >
            {/* TODO: InputLabel no anda correctamente, se renderiza superpuesto a Autocomplete */}
            {/* <InputLabel id={`${id}-label`}>{label}</InputLabel> */}
            <Autocomplete
                color='primary'
                disabled={disabled}
                id={id}
                // value note: empty NameCode to avoid undefined value and react 
                // giving controlled error
                value={null}
                inputValue={inputValue}
                loading={loading}
                options={options}
                groupBy={(option) => option.type}
                getOptionLabel={getOptionValue}
                renderOption={(option, state) => (
                    <div className='select-option-container'>
                        <Typography>{getOptionValue(option)}</Typography>
                    </div>
                )}
                renderInput={(params) => <TextField {...params} label={placeholder || ''} variant='outlined'/>}
                loadingText='Cargando...'
                noOptionsText='No hay resultados'
                onInputChange={(e, value: any) => props.onQueryChange(value)}
                onChange={(e, value: any) => handleRedirect(value)}
            />
        </FormControl>
    )
}


export default withRouter(SearchSelect);
