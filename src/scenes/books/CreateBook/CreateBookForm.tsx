import React, { Component } from 'react'
import { Button as Buttons, TextField, Typography } from '@material-ui/core';
import { NewBook } from '../../../model/NewBook';
import { BookFormModel } from '../../../model/Form/BookFormModel';
import validateInput from '../../../utils/validateInput';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Button, DatePicker, Input, Select } from '../../../components/Form';
import { Autocomplete } from '@material-ui/lab';
import { Author } from '../../../model/Author';
import { PhotoUtils } from "../../../utils";
import { allBookGenres } from '../../../utils';
import { allLanguages } from '../../../utils/consts';
import classes from './CreateBookForm.module.css';



interface BookFormState {
    maxDate: Date,
    values: BookFormModel,
    bytearray: any,
    formValid: boolean,
}

interface BookFormProps {
    onSubmit(values: NewBook, photo: File): void,
    authors: Author[],
    onCancel(): void,
    loading: boolean,
    onLoadImageError(): void,
}

export default class CreateBookForm extends Component<BookFormProps, BookFormState> {

    constructor(props: BookFormProps) {
        super(props)
        this.state = {
            maxDate: new Date(),
            values: {
                title: { value: '', type: 'alphanumeric', error: true, touched: false },
                genre: { value: '', type: 'select', error: true, touched: false },
                language: { value: '', type: 'select', error: true, touched: false },
                release: { value: null, type: 'date', error: true, touched: false },
                photo: { value: null, type: 'photo', error: true, touched: false },
                authors: { value: [], type: 'array', error: false, touched: true }
            },
            bytearray: null,
            formValid: false
        }
    }

    handleSubmit = () => {
        let book: NewBook = {
            title: this.state.values.title.value,
            genre: this.state.values.genre.value,
            language: this.state.values.language.value,
            date: this.state.values.release.value,
            authors: this.state.values.authors.value.map((author: Author) => author.id)
        }
        this.props.onSubmit(book, this.state.values.photo.value);
    }

    handleInput = (id: keyof BookFormModel, type: string, value: any) => {
        let error = false;
        if (type === 'date') error = !validateInput(type, value) || (value ? value > this.state.maxDate: false);
        else error = !validateInput(type, value);
        const allTouched = Object.values(this.state.values).every(value => value.type === type ? true : value.touched);
        const anyErrors = Object.values(this.state.values).some(value => value.type === type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                [id]: { value, type, error, touched: true }
            },
            formValid: allTouched && !anyErrors,
        });
    }


    handleChange = (event: any) => {
        const file: File = event.target.files[0];
        if (file === undefined) return;
        const error: boolean = file.size >= PhotoUtils.MAX_PHOTO_SIZE;
        if (!error) {
            this.readFile(file);
            this.handleInput('photo', 'photo', file);
        } else {
            this.setState({ ...this.state, values: { ...this.state.values, photo: { value: null, type: 'photo', error: true, touched: true } }, formValid: false })
        }
    }

    handleChangeArray = (event: any, values: Author[]) => {
        this.setState({
            values: {
                ...this.state.values,
                authors: { value: values, type: 'array', error: false, touched: true },
            }
        });
    }
    
    readFile = (file: File) => {
        if (file === undefined) return;
        if (file.size > PhotoUtils.MAX_PHOTO_SIZE || !['jpg', 'jpeg', 'png'].some((ext) => `image/${ext}` === file.type)) {
            this.props.onLoadImageError();
        } else {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                // console.log('res', this.);
                let image = new Image();
                image.src = reader.result ? reader.result.toString() : '';
                image.onload = () => {
                    if (image.width <= 480 && image.height <= 480) {
                        this.setState((prevState: BookFormState) => ({
                            ...prevState,
                            bytearray: reader.result
                        }));
                    } else this.props.onLoadImageError();
                }
                image.onerror = () => {this.props.onLoadImageError()}
            }
            reader.onerror = () => {this.props.onLoadImageError()}
        }
    };

    render() {
        console.log('create book form', this.state);
        const image = this.state.bytearray ?
            <img src={this.state.bytearray} width='100' alt='avatar' /> :
            <MenuBookIcon color='secondary' style={{ height: 150, width: 100 }} />
        return (
            <form>
                <div className={classes.formContainer}>
                    <div className={classes.leftContainer}>
                        <Input
                            label='Titulo'
                            id='title'
                            type='title'
                            onChange={this.handleInput}
                            value={this.state.values.title.value}
                            error={this.state.values.title.touched && this.state.values.title.error}
                            errorText={this.state.values.title.touched && this.state.values.title.error ? 'Titulo inválido' : ''}
                            required
                        />
                        <Select
                            label='Género'
                            id='genre'
                            value={this.state.values.genre.value}
                            options={allBookGenres}
                            onChange={this.handleInput}
                        />
                        <Select
                            label='Idioma'
                            id='language'
                            value={this.state.values.language.value}
                            options={allLanguages}
                            onChange={this.handleInput}
                        />
                        <DatePicker
                            label='Fecha de Publicación'
                            id='release'
                            error={this.state.values.release.touched && this.state.values.release.error}
                            helperText={this.state.values.release.touched && this.state.values.release.error ? 'Fecha inválida' : ''}
                            value={this.state.values.release.value}
                            onChange={this.handleInput}
                            maxDate={this.state.maxDate}
                            required
                        />
                        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                fullWidth
                                error={this.state.values.release.touched && this.state.values.release.error}
                                helperText={this.state.values.release.touched && this.state.values.release.error ? 'Lanzamiento mayor a fecha actual' : null}
                                color="secondary"
                                disableToolbar
                                required
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                margin="none"
                                id="date-picker-inline"
                                label="Fecha de Publicación"
                                value={this.state.values.release.value}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider> */}
                        {/* TODO: add functionality to components/Forms/Select to cover this component */}
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={this.props.authors}
                            getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                            defaultValue={[]}
                            onChange={this.handleChangeArray}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Autores"
                                    placeholder="Autor/es"
                                    color="secondary"
                                />
                            )}
                        />
                    </div>
                    {/* TODO: create reusable photo component (this is used in 
                    more than 1 place) */}
                    <div className={classes.rightContainer}>
                        <div className={classes.photo}>{image}</div>
                        <Buttons
                            fullWidth
                            variant="contained"
                            component="label"
                            onChange={this.handleChange}
                            color='secondary'
                        >
                            Agrega una foto
                            <input
                                accept='.png, .jpg, .jpeg'
                                type="file"
                                style={{ display: "none" }}
                            />
                        </Buttons>
                        {this.state.values.photo.error && this.state.values.photo.touched && <Typography color='error'>El tamaño de la imagen no puede superar los 100Kb</Typography>}
                    </div>
                </div>
                <div className={classes.buttonsContainer}>
                    <Button title="Cancelar" variant='outlined' disabled={false} onClick={this.props.onCancel} />
                    <Button title='Crear Libro' variant='contained' disabled={!this.state.formValid} onClick={this.handleSubmit} />
                </div>
            </form>
        )
    }

}