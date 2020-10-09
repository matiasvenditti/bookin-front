import { FormControl, IconButton, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import classes from './SearchSelect.module.css';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';


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
    onEnter(value: string): void,
}

const SearchSelect = (props: SearchSelectProps) => {
    const {
        inputValue,
        // placeholder,
        id,
        disabled,
        loading,
        // error,
        // loadingOptions,
        options,
    } = props;
    const [focused, setFocused] = useState(false);
    // console.log('render search select', focused);
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

    const handleEnter = (value: string) => {
        props.onEnter(value);
        props.history.push('/results');
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
                renderInput={(params) => (
                    <TextField
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            classes: {
                                root: classes.textField,
                                focused: classes.textField,
                                notchedOutline: classes.textField
                            }
                        }}
                        label={''}
                        variant='outlined'
                        onKeyDown={(e: any) => {
                            if (e.keyCode === 13 && e.target.value) {
                                handleEnter(e.target.value);
                                setFocused(false);
                            }
                        }}
                    />
                )}
                open={focused}
                loadingText='Cargando...'
                noOptionsText='No hay resultados'
                clearOnEscape // ESC empties value
                clearOnBlur={false}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} // fix feo pero funciona
                onInputChange={(e, value: any) => props.onQueryChange(value)}
                onChange={(e, value: any) => handleRedirect(value)}
            />
            {inputValue !== '' &&
                <IconButton onClick={() => handleEnter(inputValue)}>
                    <SearchIcon/>
                </IconButton>
            }
            <IconButton onClick={() => handleEnter('')}>
                <SettingsIcon/>
            </IconButton>
        </FormControl>
    )
}


export default withRouter(SearchSelect);
