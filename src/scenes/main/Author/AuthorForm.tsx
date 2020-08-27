import React, { Component, ChangeEvent } from 'react';
import { Checkbox, Input, RadioGroup, Button} from '../../../components/Form';
import {Form, FormValue} from '../../../model';
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
import { Select, MenuItem, TextField, makeStyles, Theme, createStyles, withStyles, Typography, InputLabel, Button as Buttons } from '@material-ui/core';
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import { SystemUpdate } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';


    interface RegisterFormState {
        values: Form;
        bytearray: any;
    }

    interface RegisterFormProps{
        onSubmit(values: NewAuthor, photo: File): void;
    }

export default class AuthorForm extends Component<RegisterFormProps, RegisterFormState>{

    constructor(props: RegisterFormProps){
        super(props);
        this.state = {
            values:{
                name: {value: '', type: 'text', error: true, touched: false, validators: [requiredString, textValidator]},
                surname: {value: '', type: 'text', error: true, touched: false, validators: [requiredString, textValidator]},
                nationality: {value: '', type: 'select', error: true, touched: false, validators: [requiredString]},
                dob: {value: new Date, type:'date', error: true, touched: false, validators: [requiredString]},
                photo: {value: null, type: 'File', error: true, touched: false, validators: [required]},
            },
            bytearray: null
        }
        
    }


    handleSubmit = () => {
        let values: NewAuthor = {
            firstName: this.state.values.name.value,
            lastName: this.state.values.surname.value,
            nationality: this.state.values.nationality.value,
            birthday: this.state.values.dob.value,
            }
        this.props.onSubmit(values, this.state.values.photo.value);
    }

    handleInput = (id: keyof Form, type: string, value: any) => {
        const formValue: FormValue = this.state.values[id];
        const error: boolean = formValue.validators.some((validator: Validator) => !validator(value));
        this.setState({
            values: {
                ...this.state.values,
                [id]: { value, type, error, touched: true, validators: formValue.validators }            
            },
        });
    }

    isFormValid = (): boolean => {
        return Object.values(this.state.values).some((value: FormValue) => value.error);
    }

    handleDateChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        console.log(event.target.value)
        const date = event.target.value as string;
        this.setState((prevState: RegisterFormState) => ({
            ...prevState,
            dob: date
        }));
        this.state.values.dob.error = false;
        this.state.values.dob.touched = true;
        console.log(this.state)
    }

    handleInputSelect = (object: any) => {
        const nacionalidad =  object.target.value as string;
           this.setState({
            values: {
                ...this.state.values,
                nationality : {value: nacionalidad,type: this.state.values.nationality.type, error: false, touched: true, validators: this.state.values.nationality.validators}
                },
            });

        this.state.values.nationality.error = false;
        this.state.values.nationality.touched = true;
        //this.state.values.nationality.value = nacionalidad;
        console.log(this.state)
        console.log(nacionalidad)
    }

        handleChange = (event: any) => {
            const file: File = event.target.files[0];
            const ulr = this.readFile(file);
            this.setState((prevState: RegisterFormState) => ({
                ...prevState,
                photo : {value: file, type: this.state.values.photo.type, error: false, touched: true, validators: this.state.values.photo.validators},
                //bytearray: ulr
            }))

            this.state.values.photo.error = false;
            this.state.values.photo.touched = true;
            this.state.values.photo.value = file;
            console.log(this.state);
        }

    readFile = (file: File) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => {
            this.setState({
                bytearray: reader.result
            });
            console.log(reader.result);
        }
    }

    render(){
        const image = this.state.bytearray ? <img src={this.state.bytearray}/> : null

        return(
            <form>
                <Input
                    label='Nombre'
                    id='name'
                    type='text'
                    onChange={this.handleInput}
                    value={this.state.values.name.value}
                    error={this.state.values.name.touched && this.state.values.name.error}
                    errorText={this.state.values.name.touched && this.state.values.name.error ? 'Nombre inválido' : ''}
                    required
                />
                <Input
                    label='Apellido'
                    id='surname'
                    type='text'
                    onChange={this.handleInput}
                    value={this.state.values.surname.value}
                    error={this.state.values.surname.touched && this.state.values.surname.error}
                    errorText={this.state.values.surname.touched && this.state.values.surname.error ? 'Apellido inválido' : ''}
                    required
                />
                <div>
                    <InputLabel id="demo-simple-select-label">Nacionalidad</InputLabel>                    
                    <Select
                        autoWidth={false}
                        labelId="demo-simple-select-label"
                        id="nationality"
                        type="select"
                        defaultValue='Seleccionar...'
                        name='nationality'
                        value={this.state.values.nationality.value}
                        onChange={this.handleInputSelect}
                        >
                        <MenuItem value='Argentina'>Argentina</MenuItem>
                        <MenuItem value='Gran Bretaña'>Gran Bretaña</MenuItem>
                        <MenuItem value='España'>España</MenuItem>
                    </Select>   
                </div>
                <TextField
                    id='dob'
                    label='Fecha de nacimiento'
                    type='date'
                    defaultValue={this.state.values.dob.value}
                    onChange={this.handleDateChange} 
                    className='textField'
                    InputLabelProps={{
                        shrink: true,
                      }}  
                />
                <Buttons variant="contained" component="label" onChange={this.handleChange}
 >
                    Upload File
                    <input
                        accept="image/*"
                        type="file"
                        style={{ display: "none" }}
                    />
                </Buttons>

                
                {image}
                
                <Button
                    title='Crear Autor'
                    disabled={this.isFormValid()}                    
                    onClick={this.handleSubmit}
                />
            </form> 
        )
    }
}
