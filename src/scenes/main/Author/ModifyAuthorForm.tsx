import React, {ChangeEvent, Component} from 'react';
import {Button, Input} from '../../../components/Form';
import {AuthorFormModel} from '../../../model/Form/AuthorFormModel';
import Grid from '@material-ui/core/Grid';
import {Button as Buttons, FormControl, InputLabel, MenuItem, Select, TextField} from '@material-ui/core';

import "./AuthorForm.css"
import validateInput from '../../../utils/validateInput';
import {AccountCircle} from '@material-ui/icons';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { UpdateAuthor } from '../../../model/UpdateAuthor';
import { EditAuthorFormModel } from '../../../model/Form/EditAuthorFormModel';
import { RequestStatus } from '../../../model/consts/RequestStatus';
import { AxiosResponse } from 'axios';
import { ResponseUpdate, update } from '../../../services/SessionService';
import { EditVar } from '../../../model/consts/EditVar';
import { AuthorEditInterface } from '../../../model';
import { changeAuthorData } from '../../../services/AuthorService';


interface AuthorFormState {
    values: EditAuthorFormModel;
    bytearray: any;
    formValid: boolean,
    updateStatus: any,
    error: any,
    editVariable: EditVar,
}


interface AuthorFormProps {
    data: {
        id: string,
        firstName: string,
        lastName: string,
        nationality: string,
        birthday: string,
        photo: File,
    }
//    onSubmit(values: UpdateAuthor): void;
    onCancel(): void;
    editVariable: EditVar,

}

export default class ModifyAuthorForm extends Component<any, AuthorFormState> {

    maxFileSize: number = 100000;

    constructor(props: AuthorFormProps) {
        super(props);
        this.state = {
            values: {
                id: {value: props.data.id, type: 'hidden', error: false},
                firstName: {value: props.data.firstName, type: 'text', error: false},
                lastName: {value: props.data.lastName, type: 'text', error: false},
                nationality: {value: props.data.nationality, type: 'select', error: false},
                birthday: {value: props.data.birthday, type: 'date', error: false},
                photo: {value: props.data.photo, type: 'File', error: false},
            },
            bytearray: null,
            formValid: false,
            updateStatus: RequestStatus.NONE,
            editVariable: props.editVariable,
            error: null,
        }
    }

    /**   handleSubmit = () => {
        let values: UpdateAuthor = {
            firstName: this.state.values.firstName.value,
            lastName: this.state.values.lastName.value,
            nationality: this.state.values.nationality.value,
            birthday: this.state.values.birthday.value,
            photo: this.state.values.photo.value
        }
        //this.props.onSubmit(values , this.state.values.photo.value);
    }*/

     handleSubmit = (values: AuthorEditInterface) => {
        this.setState({ updateStatus: RequestStatus.LOADING, error: null });
        changeAuthorData(values, this.state.values.photo.value)
            .then((response: AxiosResponse<ResponseUpdate>) => {
                this.setState({ updateStatus: RequestStatus.SUCCESS, error: null });
                this.props.history.push('/profile');
            })
            .catch((error) => {
                this.setState({ updateStatus: RequestStatus.ERROR, error });
            });
    } 

    handleInput = (id: keyof AuthorFormModel, type: string, value: any) => {
        const error = !validateInput(type, value);
        const anyErrors = Object.values(this.state.values).some(value => value.type === type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                [id]: {value, type, error}
            },
            formValid: !anyErrors,
        });
    }


    handleDateChange = (date: Date | null) => {
        const error: boolean = date ? date > new Date() : false;
        const birthday = this.state.values.birthday;

        const anyErrors = Object.values(this.state.values).some(value => value.type === birthday.type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                birthday: {value: date, type: birthday.type, error: error}
            },
            formValid: !anyErrors,
        });
    }

    handleInputSelect = (object: any) => {
        const nacionalidad = object.target.value as string;
        const nationality = this.state.values.nationality;
        const error: boolean = false;

        const anyErrors = Object.values(this.state.values).some(value => value.type === nationality.type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                nationality: {
                    value: nacionalidad,
                    type: this.state.values.nationality.type,
                    error: false,
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
                photo: {value: file, type: photo.type, error: error},
            },
            formValid:!anyErrors,
        });
    }

    readFile = (file: File) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.setState((prevState: AuthorFormState) => ({
                ...prevState,
                bytearray: reader.result
            }));
        }
    }

    handleSubmitTemp = () => {
        this.handleSubmit({
            id: this.state.values.id.value, 
            firstName: this.state.values.firstName.value,
            lastName: this.state.values.lastName.value,
            nationality: this.state.values.nationality.value,
            birthday: this.state.values.birthday.value,
        });
    }


    handleCancel = () => {
        this.props.onCancel({})
    }


    render() {
        const image = this.state.bytearray ?
            <img src={this.state.bytearray} width="100" height="100" alt="author-image"/> :
            <AccountCircle color="secondary" style={{fontSize: 100}}/>

        return (
            <form>
                <Grid alignItems="center" container spacing={3}>
                    <Grid item xs>
                        <Input
                            label='Nombre'
                            id='firstName'
                            type='text'
                            onChange={this.handleInput}
                            value={this.state.values.firstName.value}
                            error={this.state.values.firstName.error}
                            errorText={this.state.values.firstName.error ? 'Nombre inválido' : ''}
                            required
                        />
                    </Grid>
                    <Grid item xs>
                        <Input
                            label='Apellido'
                            id='lastName'
                            type='text'
                            onChange={this.handleInput}
                            value={this.state.values.lastName.value}
                            error={this.state.values.lastName.error}
                            errorText={this.state.values.lastName.error ? 'Apellido inválido' : ''}
                            required
                        />
                    </Grid>
                    <Grid item xs>
                        <div className="center">
                            {image}
                        </div>
                    </Grid>
                </Grid>

                <Grid alignItems="center" container spacing={3}>
                    <Grid item xs>
                        <FormControl required fullWidth color="secondary" variant="outlined">
                            <InputLabel id="demo-simple-select-label">Nacionalidad</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="nationality"
                                type="select"
                                name='nationality'
                                value={this.state.values.nationality.value}
                                onChange={this.handleInputSelect}
                                label="Nacionalidad"
                            >
                                <MenuItem value='Argentina'>Argentina</MenuItem>
                                <MenuItem value='Gran Bretaña'>Gran Bretaña</MenuItem>
                                <MenuItem value='España'>España</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                fullWidth
                                error={this.state.values.birthday.error}
                                helperText={this.state.values.birthday.error ? 'Nacimiento mayor a fecha actual' : null}
                                color="secondary"
                                disableToolbar
                                required
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                margin="none"
                                id="date-picker-inline"
                                label="Nacimiento"
                                value={this.state.values.birthday.value}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs>
                        <Buttons fullWidth variant="contained" component="label" onChange={this.handleChange}
                                 color='secondary'>
                            Agrega una foto
                            <input
                                accept="image/*"
                                type="file"
                                style={{display: "none"}}
                            />
                        </Buttons>
                    </Grid>
                </Grid>
                <div>
                    <div className="spacing">
                        <Button title='Crear Autor' disabled={!this.state.formValid} onClick={this.handleSubmitTemp}/>
                    </div>
                    <div className="spacing">
                        <Button title="Cancelar" disabled={false} onClick={this.handleCancel}/>
                    </div>
                </div>
            </form>
        )
    }
}