import React, {Component} from 'react'
import { Button as Buttons, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { NewBook } from '../../../model/NewBook';
import { BookFormModel } from '../../../model/Form/BookFormModel';
import validateInput from '../../../utils/validateInput';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Button, Input } from '../../../components/Form';
import './CreateBookForm.css'


interface BookFormState {
    values: BookFormModel;
    bytearray: any;
    formValid: boolean
}

interface BookFormProps {
    onSubmit(values: NewBook, photo: File): void;
}

export default class CreateBookForm extends Component<BookFormProps, BookFormState> {

    maxFileSize: number = 100000;

    constructor(props: BookFormProps){
        super(props)
        this.state = {
            values: {
                title: { value: '', type: 'text', error: true, touched: false },
                genre: { value: '', type: 'select', error: true, touched: false },
                languaje: { value: '', type: 'select', error: true, touched: false },
                release: { value: null, type: 'date', error: true, touched: false },
                photo: { value: null, type: 'File', error: true, touched: false },
            },
            bytearray: null,
            formValid: false
        }
    }

    handleSubmit = () => {
        let book: NewBook = {
            title: this.state.values.title.value,
            genre: this.state.values.genre.value,
            languaje: this.state.values.languaje.value,
            release: this.state.values.release.value
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
        const birthday = this.state.values.birthday;

        const allTouched = Object.values(this.state.values).every(value => value.type === birthday.type ? true : value.touched);
        const anyErrors = Object.values(this.state.values).some(value => value.type === birthday.type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                birthday: { value: date, type: birthday.type, error: error, touched: true }
            },
            formValid: allTouched && !anyErrors,
        });
    }

    handleInputSelect = (object: any) => {
        const nacionalidad = object.target.value as string;
        const nationality = this.state.values.nationality;
        const error: boolean = false;

        const allTouched = Object.values(this.state.values).every(value => value.type === nationality.type ? true : value.touched);
        const anyErrors = Object.values(this.state.values).some(value => value.type === nationality.type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                nationality: {
                    value: nacionalidad,
                    type: this.state.values.nationality.type,
                    error: false,
                    touched: true
                },
            },
            formValid: allTouched && !anyErrors,
        });
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
                        onChange={this.handleInputSelect}
                        label='Género'
                    >
                        <MenuItem value='Terror'>Terror</MenuItem>
                        <MenuItem value='Policial'>Policial</MenuItem>
                        <MenuItem value='Drama'>Drama</MenuItem>
                    </Select>
                </FormControl>
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
            </form>
        )
    }

}