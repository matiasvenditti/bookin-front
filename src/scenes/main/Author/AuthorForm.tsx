import React, { Component, ChangeEvent } from 'react';
import {  Input, Button} from '../../../components/Form';
import {AuthorFormModel} from '../../../model/Form/AuthorFormModel';
import {requiredString,required, requiredTrue, Validator} from "../../../utils/Validators/RequiredValidator";
import {emailValidator, passwordValidator, textValidator} from "../../../utils/Validators/validateInput";
import { NewAuthor } from '../../../model/NewAuthor';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Select, MenuItem, TextField, InputLabel, Button as Buttons, FormControl } from '@material-ui/core';

import "./AuthorForm.css"
import validateInput from '../../../utils/validateInput';
import { AccountCircle } from '@material-ui/icons';


    interface AuthorFormState {
        values: AuthorFormModel;
        bytearray: any;
        formValid: boolean
    }

    interface AuthorFormProps{
        onSubmit(values: NewAuthor, photo: File): void;
    }

export default class AuthorForm extends Component<AuthorFormProps, AuthorFormState>{

    constructor(props: AuthorFormProps){
        super(props);
        this.state = {
            values:{
                firstName: {value: '', type: 'text', error: true, touched: false},
                lastName: {value: '', type: 'text', error: true, touched: false},
                nationality: {value: '', type: 'select', error: true, touched: false},
                birthday: {value: new Date, type:'date', error: true, touched: false},
                photo: {value: null, type: 'File', error: true, touched: false},
            },
            bytearray: null,
            formValid: false
        }
        
    }


    handleSubmit = () => {
        let values: NewAuthor = {
            firstName: this.state.values.firstName.value,
            lastName: this.state.values.lastName.value,
            nationality: this.state.values.nationality.value,
            birthday: this.state.values.birthday.value,
            }
        this.props.onSubmit(values, this.state.values.photo.value);
    }

    handleInput = (id: keyof AuthorFormModel, type: string, value: any) => {
        const error = !validateInput(type, value);
        const allTouched = Object.values(this.state.values).every(value => value.type === type ? true : value.touched === true);
        const anyErrors = Object.values(this.state.values).some(value => value.type === type ? error : value.error === true);
        this.setState({
            values: {
                ...this.state.values,
                [id]: { value, type, error, touched: true }            
            },
            formValid: allTouched && !anyErrors,
        });
    }



    handleDateChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const date = event.target.value as string;
        this.setState((prevState: AuthorFormState) => ({
            ...prevState,
            birthday: date
        }));
        this.state.values.birthday.error = false;
        this.state.values.birthday.touched = true;
        const errors: boolean = this.state.values.firstName.error || this.state.values.lastName.error || this.state.values.birthday.error || this.state.values.nationality.error || this.state.values.photo.error;
        this.setState({
            formValid: !errors,
        })
    }

    handleInputSelect = (object: any) => {
        const nacionalidad =  object.target.value as string;
           this.setState({
            values: {
                ...this.state.values,
                nationality : {value: nacionalidad,type: this.state.values.nationality.type, error: false, touched: true}
                },
            });

        this.state.values.nationality.error = false;
        this.state.values.nationality.touched = true;
        //this.state.values.nationality.value = nacionalidad
        const errors: boolean = this.state.values.firstName.error || this.state.values.lastName.error || this.state.values.birthday.error || this.state.values.nationality.error || this.state.values.photo.error;
        this.setState({
            formValid: !errors,
        })
    }

        handleChange = (event: any) => {
            const file: File = event.target.files[0];
            const ulr = this.readFile(file);
            this.setState((prevState: AuthorFormState) => ({
                ...prevState,
                photo : {value: file, type: this.state.values.photo.type, error: false, touched: true},
            }))
            const error = file.size < 100000 ? false : true
            this.state.values.photo.error = error;
            this.state.values.photo.touched = true;
            this.state.values.photo.value = file;
            const errors: boolean = this.state.values.firstName.error || this.state.values.lastName.error || this.state.values.birthday.error || this.state.values.nationality.error || this.state.values.photo.error;
            this.setState({
                formValid: !errors,
            })
        }

    readFile = (file: File) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => {
            this.setState({
                bytearray: reader.result
            });
        }
    }

    render(){
        const image = this.state.bytearray ? <img src={this.state.bytearray} width="100" height="100" /> : <AccountCircle color="secondary" style={{ fontSize: 100 }}/>

        return(
            <form>
                <Grid container spacing={3}>               
                    <Grid item >
                        <Input
                            label='Nombre'
                            id='firstName'
                            type='text'
                            onChange={this.handleInput}
                            value={this.state.values.firstName.value}
                            error={this.state.values.firstName.touched && this.state.values.firstName.error}
                            errorText={this.state.values.firstName.touched && this.state.values.firstName.error ? 'Nombre inválido' : ''}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            label='Apellido'
                            id='lastName'
                            type='text'
                            onChange={this.handleInput}
                            value={this.state.values.lastName.value}
                            error={this.state.values.lastName.touched && this.state.values.lastName.error}
                            errorText={this.state.values.lastName.touched && this.state.values.lastName.error ? 'Apellido inválido' : ''}
                            required
                        />
                    </Grid>
                    <Grid item>
                        {image}
                    </Grid>
                </Grid>
                <div className="form-input-container">

                <FormControl>
                    <Grid container spacing={3}>                
                        <Grid item>
                            <div>
                                <InputLabel id="demo-simple-select-label" className="label">Nacionalidad</InputLabel>                    
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="nationality"
                                    type="select"
                                    defaultValue='Seleccionar...'
                                    name='nationality'
                                    value={this.state.values.nationality.value}
                                    onChange={this.handleInputSelect}
                                    variant='outlined'
                                    color='secondary'
                                    fullWidth
                                    className="select"
                                    >
                                    <MenuItem value='Argentina'>Argentina</MenuItem>
                                    <MenuItem value='Gran Bretaña'>Gran Bretaña</MenuItem>
                                    <MenuItem value='España'>España</MenuItem>
                                </Select>   
                            </div>
                        </Grid>
                        
                        <Grid item>
                            <TextField
                                id='birthday'
                                label='Fecha de nacimiento'
                                type='date'
                                defaultValue={this.state.values.birthday.value}
                                onChange={this.handleDateChange} 
                                InputLabelProps={{
                                    shrink: true,
                                }}  
                                variant='outlined'
                                color='secondary'
                                fullWidth
                                className="date"
                            />
                        </Grid>
                        <Grid item>
                            <Buttons variant="contained" component="label" onChange={this.handleChange} color='secondary' >
                            Agrega una foto
                                <input
                                accept="image/*"
                                type="file"
                                style={{ display: "none"}}
                            />
                        </Buttons>
                        </Grid>
                    </Grid>
                </FormControl>                
            </div> 
            <div className='spacingh'></div>
            <Grid container spacing={5}>
                <Grid item>
            <div className='spacingw'></div></Grid>
                <Grid item>
            <div className='spacingw'></div></Grid>
            <Grid item>
            <div className='spacingw'></div></Grid>
            <Grid item>
            <Button title='Crear Autor' disabled={!this.state.formValid} onClick={this.handleSubmit} /></Grid>
            <Grid item>
            <Button title="Cancelar" disabled={false} onClick={this.handleSubmit}/></Grid>
            </Grid>
            </form> 
        )
    }
}
