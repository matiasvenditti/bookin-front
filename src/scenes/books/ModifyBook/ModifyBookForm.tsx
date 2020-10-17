import React, {Component} from 'react'
import {Button as Buttons, TextField, Typography} from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Autocomplete } from '@material-ui/lab';
import classes from "./ModifyBookForm.module.css";
import { allBookGenres, PhotoUtils, validateInput } from '../../../utils';
import { Button, DatePicker, Input, Select } from '../../../components/Form';
import { BookFormModel } from '../../../model/Form/BookFormModel';
import { UpdateBook } from '../../../model/UpdateBook';
import { Author } from '../../../model/Author';
import { Book } from '../../../model';
import { allLanguages } from '../../../utils/consts';


interface BookFormState {
    maxDate: Date,
    values: BookFormModel,
    bytearray: any,
    formValid: boolean
}

interface BookFormProps {
    onSubmit(values: UpdateBook, photo: File): void;
    authors: Author[],
    allAuthors: Author[],
    book: Book,
    onCancel(): void;
    loading: boolean,
}

export default class ModifyBookForm extends Component<BookFormProps, BookFormState> {
    constructor(props: BookFormProps){
        super(props)
        this.state = {
            maxDate: new Date(),
            values: {
                id:{ value: this.props.book.id, type: 'hidden', error: false, touched: true},
                title: { value: this.props.book.title, type: 'alphanumeric', error: false, touched: true },
                genre: { value: this.props.book.genre, type: 'select', error: false, touched: true },
                language: { value: this.props.book.language, type: 'select', error: false, touched: true },
                date: { value: this.props.book.date, type: 'date', error: false, touched: true },
                photo: { value: this.props.book.photo, type: 'photo', error: false, touched: true },
                authors: { value:this.props.authors, type: 'array', error: false, touched: true}
            },
            bytearray: PhotoUtils.getPhotoFromBytearray(this.props.book.photo),
            formValid: false
        }
    }

    handleSubmit = () => {
        let book: UpdateBook = {
            id: this.state.values.id.value,
            title: this.state.values.title.value,
            genre: this.state.values.genre.value,
            language: this.state.values.language.value,
            date: this.state.values.date.value,
            authors: this.state.values.authors.value
        }
        this.props.onSubmit(book, this.state.values.photo.value);
    }
    handleInput = (id: keyof BookFormModel, type: string, value: any) => {
        const error = !validateInput(type, value);
        const anyErrors = Object.values(this.state.values).some(value => value.type === type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                [id]: { value, type, error, touched: true }
            },
            formValid: !anyErrors,
        });
    }


    handleDateChange = (date: Date | null) => {
        const error: boolean = date ? date > new Date() : false;
        const date2 = this.state.values.date;

        const anyErrors = Object.values(this.state.values).some(value => value.type === date2.type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                date: { value: date, type: date2.type, error: error, touched: true }
            },
            formValid: !anyErrors,
        });
    }

    handlePhotoChange = (event: any) => {
        const file: File = event.target.files[0];
        const error: boolean = file.size >= PhotoUtils.MAX_PHOTO_SIZE;
        const photo = this.state.values.photo;
        if (!error) this._readFile(file);
        const anyErrors = Object.values(this.state.values).some(value => value.type === photo.type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                photo: { value: file, type: photo.type, error: error, touched: true },
            },
            formValid: !anyErrors,
        });
    }

    handleChangeAutocomplete = (event: any, values: Author[]) => {
        const error: boolean = false;
        const authors = this.state.values.authors;
        const anyErrors = Object.values(this.state.values).some(value => value.type === authors.type ? error : value.error);
        this.setState ({
            values: {
                ...this.state.values,
                authors: { value: values, type: 'array', error: false, touched: true },
            },
            formValid: !anyErrors,
        });
    }

    _readFile = (file: File) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.setState((prevState: BookFormState) => ({
                ...prevState,
                bytearray: reader.result
            }));
        }
    }

    render(){

        const image = this.state.values.photo.value ?
            <img src={this.state.bytearray} height='100' width='100' alt={"Cover Page"}/> :
            <MenuBookIcon color='secondary' style={{ height: 100, width: 100}}/>

        return(
            <form>
                <div className={classes.formContainer}>
                    <div className={classes.leftContainer}>
                        <Input
                            label='Titulo'
                            id='title'
                            type='alphanumeric'
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
                            error={this.state.values.date.touched && this.state.values.date.error}
                            helperText={this.state.values.date.touched && this.state.values.date.error ? 'Lanzamiento mayor a fecha actual' : null}
                            id='date'
                            required
                            label='Fecha de Publicación'
                            value={this.state.values.date.value}
                            onChange={this.handleInput}
                            maxDate={this.state.maxDate}
                        />
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={this.props.allAuthors}
                            value={this.state.values.authors.value as Author[]}
                            getOptionSelected={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                            defaultValue={this.state.values.authors.value}
                            onChange={this.handleChangeAutocomplete}
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
                    <div className={classes.rightContainer}>
                        <div className={classes.photo}>
                            {image}
                        </div>
                        <Buttons fullWidth variant="contained" component="label" onChange={this.handlePhotoChange}
                                 color='secondary'>
                            Modifica la Foto
                            <input
                                accept="image/*"
                                type="file"
                                style={{ display: "none" }}
                            />
                        </Buttons>
                        {this.state.values.photo.error && this.state.values.photo.touched && <Typography color='error'>El tamaño de la imagen no puede superar los 100Kb</Typography>}
                    </div>
                </div>
                <div className={classes.createAuthorButtonsContainer}>
                    <Button title="Cancelar" variant='outlined' disabled={false} onClick={this.props.onCancel} />
                    <Button title='Actualizar' variant='contained' disabled={!this.state.formValid} onClick={this.handleSubmit} />
                </div>
            </form>
        )
    }

}