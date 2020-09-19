import React, {Component} from 'react'
import { Button as Buttons, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { BookFormModel } from '../../../../model/Form/BookFormModel';
import validateInput from '../../../../utils/validateInput';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Button, Input } from '../../../../components/Form';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Autocomplete } from '@material-ui/lab';
import { Author } from '../../../../model/Author';
import {UpdateBook} from "../../../../model";
import "./ModifyBookForm.css"

interface BookFormState {
    values: BookFormModel;
    bytearray: any;
    formValid: boolean
}

interface BookFormProps {
    onSubmit(values: UpdateBook, photo: File): void;
    authors: Author[];
    book: {
        id: string,
        title: string,
        genre: string,
        date: string,
        photo: string,
        language: string,
        stars: number,
    },
    onCancel(): void;
    loading: boolean,
}

export default class ModifyBookForm extends Component<BookFormProps, BookFormState> {

    maxFileSize: number = 100000;

    constructor(props: BookFormProps){
        super(props)
        this.state = {
            values: {
                id:{ value: this.props.book.id, type: 'hidden', error: false, touched: true},
                title: { value: this.props.book.title, type: 'alphanumeric', error: false, touched: true },
                genre: { value: this.props.book.genre, type: 'select', error: false, touched: true },
                language: { value: this.props.book.language, type: 'select', error: false, touched: true },
                date: { value: this.props.book.date, type: 'date', error: false, touched: true },
                photo: { value: this.props.book.photo, type: 'File', error: false, touched: true },
                authors: { value:this.props.authors, type: 'array', error: false, touched: true}
            },
            bytearray: this.props.book.photo,
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


    handleDateChange = (date2: Date | null) => {
        const error: boolean = date2 ? date2 > new Date() : false;
        const date = this.state.values.date;

        const anyErrors = Object.values(this.state.values).some(value => value.type === date.type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                date: { value: date, type: date.type, error: error, touched: true }
            },
            formValid: !anyErrors,
        });
    }

    handleInputSelectL = (object: any) => {
        const idioma = object.target.value as string;
        const language = this.state.values.language;
        const error: boolean = false;

        const anyErrors = Object.values(this.state.values).some(value => value.type === language.type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                language: {
                    value: idioma,
                    type: this.state.values.language.type,
                    error: false,
                    touched: true
                },
            },
            formValid: !anyErrors,
        });
    }

    handleInputSelectG = (object: any) => {
        const genero = object.target.value as string;
        const genre = this.state.values.genre;
        const error: boolean = false;

        const anyErrors = Object.values(this.state.values).some(value => value.type === genre.type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                genre: {
                    value: genero,
                    type: this.state.values.language.type,
                    error: false,
                    touched: true
                },
            },
            formValid: !anyErrors,
        });
    }

    handleChange = (event: any) => {
        const file: File = event.target.files[0];
        const error: boolean = file.size >= this.maxFileSize
        const photo = this.state.values.photo;
        this.readFile(file);

        const anyErrors = Object.values(this.state.values).some(value => value.type === photo.type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                photo: { value: file, type: photo.type, error: error, touched: true },
            },
            formValid: !anyErrors,
        });
    }

    handleChangeArray = (event: any, values: Author[]) => {
        this.setState ({
            values: {
                ...this.state.values,
                authors: { value: values, type: 'array', error: false, touched: true },
            }
        });
    }

    readFile = (file: File) => {
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
            <img src={"data:image/jpeg;base64, "+this.state.bytearray} height='100' width='100' alt={"Cover Page"}/> :
            <MenuBookIcon color='secondary' style={{ height: 100, width: 100}}/>

        return(
            <form>
                <Grid alignItems='center' container spacing={2}>
                    <Grid item xs>
                        <div className='spacing'>
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
                        </div>
                        <div className='spacing'>
                            <FormControl required fullWidth color='secondary' variant='outlined'>
                                <InputLabel id="demo-simple-select-label">Género</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id='genre'
                                    type='select'
                                    name='genre'
                                    value={this.state.values.genre.value}
                                    onChange={this.handleInputSelectG}
                                    label='Género'
                                >
                                    <MenuItem value='Terror'>Terror</MenuItem>
                                    <MenuItem value='Policial'>Policial</MenuItem>
                                    <MenuItem value='Drama'>Drama</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='spacing'>
                            <FormControl required fullWidth color='secondary' variant='outlined'>
                                <InputLabel id='idioma' color='secondary' variant='outlined'>Idioma</InputLabel>
                                <Select
                                    labelId='idioma'
                                    id='language'
                                    type='select'
                                    name='genre'
                                    value={this.state.values.language.value}
                                    onChange={this.handleInputSelectL}
                                    label='Idioma'
                                >
                                    <MenuItem value='Español'>Español</MenuItem>
                                    <MenuItem value='Inglés'>Inglés</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='spacing'>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    fullWidth
                                    error={this.state.values.date.touched && this.state.values.date.error}
                                    helperText={this.state.values.date.touched && this.state.values.date.error ? 'Lanzamiento mayor a fecha actual' : null}
                                    color="secondary"
                                    disableToolbar
                                    required
                                    inputVariant="outlined"
                                    format="dd/MM/yyyy"
                                    margin="none"
                                    id="date-picker-inline"
                                    label="Fecha de Publicación"
                                    value={this.state.values.date.value}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className='spacing'>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={this.props.authors}
                                getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                                defaultValue={this.state.values.authors.value}
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
                    </Grid>
                    <Grid item xs>
                        <div className='photo'>
                            {image}
                        </div>
                        <Buttons fullWidth variant="contained" component="label" onChange={this.handleChange}
                                 color='secondary'>
                            Modifica la Foto
                            <input
                                accept="image/*"
                                type="file"
                                style={{ display: "none" }}
                            />
                        </Buttons>
                    </Grid>
                </Grid>
                <div className='create-author-buttons-container'>
                    <Button title="Cancelar" variant='outlined' disabled={false} onClick={this.props.onCancel} />
                    <Button title='Actualizar' variant='contained' disabled={!this.state.formValid} onClick={this.handleSubmit} />
                </div>
            </form>
        )
    }

}