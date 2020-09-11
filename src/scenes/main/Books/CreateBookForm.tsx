import React, {Component} from 'react'
import { Button as Buttons, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { NewBook } from '../../../model/NewBook';
import { BookFormModel } from '../../../model/Form/BookFormModel';
import validateInput from '../../../utils/validateInput';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Button, Input } from '../../../components/Form';
import './CreateBookForm.css'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Autocomplete } from '@material-ui/lab';
import { Author } from '../../../model/Author';



interface BookFormState {
    values: BookFormModel;
    bytearray: any;
    formValid: boolean
}

interface BookFormProps {
    onSubmit(values: NewBook, photo: File): void;
    authors: Author[];
}

export default class CreateBookForm extends Component<BookFormProps, BookFormState> {

    maxFileSize: number = 100000;

    constructor(props: BookFormProps){
        super(props)
        this.state = {
            values: {
                title: { value: '', type: 'text', error: true, touched: false },
                genre: { value: '', type: 'select', error: true, touched: false },
                language: { value: '', type: 'select', error: true, touched: false },
                release: { value: null, type: 'date', error: true, touched: false },
                photo: { value: null, type: 'File', error: true, touched: false },
                authors: { value:[], type: 'array', error: false, touched: true}
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
            authors: this.state.values.authors.value
        }
        this.props.onSubmit(book, this.state.values.photo.value);
    }
    handleInput = (id: keyof BookFormModel, type: string, value: any) => {
        const error = !validateInput(type, value);
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


    handleDateChange = (date: Date | null) => {
        const error: boolean = date ? date > new Date() : false;
        const release = this.state.values.release;

        const allTouched = Object.values(this.state.values).every(value => value.type === release.type ? true : value.touched);
        const anyErrors = Object.values(this.state.values).some(value => value.type === release.type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                release: { value: date, type: release.type, error: error, touched: true }
            },
            formValid: allTouched && !anyErrors,
        });
    }

    handleInputSelectL = (object: any) => {
        const idioma = object.target.value as string;
        const language = this.state.values.language;
        const error: boolean = false;

        const allTouched = Object.values(this.state.values).every(value => value.type === language.type ? true : value.touched);
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
            formValid: allTouched && !anyErrors,
        });
    }

    handleInputSelectG = (object: any) => {
        const genero = object.target.value as string;
        const genre = this.state.values.genre;
        const error: boolean = false;

        const allTouched = Object.values(this.state.values).every(value => value.type === genre.type ? true : value.touched);
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
            formValid: allTouched && !anyErrors,
        });
        console.log(this.state);
    }

    handleChange = (event: any) => {
        const file: File = event.target.files[0];
        const error: boolean = file.size >= this.maxFileSize
        const photo = this.state.values.photo;
        this.readFile(file);

        const allTouched = Object.values(this.state.values).every(value => value.type === photo.type ? true : value.touched);
        const anyErrors = Object.values(this.state.values).some(value => value.type === photo.type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                photo: { value: file, type: photo.type, error: error, touched: true },
            },
            formValid: allTouched && !anyErrors,
        });
    }

    handleChangeArray = (event: any, values: Author[]) => {
        this.setState ({
            values: {
                ...this.state.values,
                authors: { value: values, type: 'array', error: false, touched: true },
            }
        });
        console.log(this.state)
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
        const image = this.state.bytearray ? 
        <img src={this.state.bytearray} width='100' height='150' /> :
        <MenuBookIcon color='secondary' style={{ height: 150, width: 100}}/>

        return(
            <form>
                <Grid alignItems='center' container spacing={2}>
                    <Grid item xs>
                        <Input
                            label='Titulo'
                            id='title'
                            type='text'
                            onChange={this.handleInput}
                            value={this.state.values.title.value}
                            error={this.state.values.title.touched && this.state.values.title.error}
                            errorText={this.state.values.title.touched && this.state.values.title.error ? 'Nombre inválido' : ''}
                            required
                        />
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
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                                label="Fecha de lanzamiento"
                                value={this.state.values.release.value}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
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
                                label="filterSelectedOptions"
                                placeholder="Autor/es"
                            />
                            )}
                        />
                    </Grid>
                    <Grid item xs>
                        <div>
                            {image}
                        </div>
                        <Buttons fullWidth variant="contained" component="label" onChange={this.handleChange}
                                    color='secondary'>
                                    Agrega una foto
                                    <input
                                        accept="image/*"
                                        type="file"
                                        style={{ display: "none" }}
                                    />
                        </Buttons>
                    </Grid>
                </Grid>
                <div>
                    <div className="spacing">
                        <Button title='Crear Autor' disabled={!this.state.formValid} onClick={this.handleSubmit} />
                    </div>
                    <div className="spacing">
                        <Button title="Cancelar" disabled={false} onClick={this.handleSubmit} />
                    </div>
                </div>
            </form>
        )
    }

}