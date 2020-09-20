import React, { Component } from 'react';
import { Button, Input, CountriesSelect } from '../../../components/Form';
import Grid from '@material-ui/core/Grid';
import { Button as MaterialButton, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import "./ModifyAuthorForm.css";
import { AccountCircle } from '@material-ui/icons';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { AuthorFormModel } from '../../../model/Form/AuthorFormModel';
import { RequestStatus } from '../../../model/consts/RequestStatus';
import { EditAuthorFormModel } from '../../../model/Form/EditAuthorFormModel';
import { UpdateAuthor } from '../../../model';


interface AuthorFormProps {
    author: EditAuthorFormModel,
    formValid: boolean,
    bytearray: any,
    onSubmit(values: UpdateAuthor, photo: File): void,
    onCancel(): void,
    onInput(id: keyof AuthorFormModel, type: string, value: any): void,
    onDateChange(date: Date | null): void,
    onInputSelect(object: any): void,
    onChange(event: any): void,
    onReadFile(file: File): void,
    updateAuthorStatus: RequestStatus,
    getAuthorDataStatus: RequestStatus,
}

export default class ModifyAuthorForm extends Component<AuthorFormProps, {}> {
    handleSubmit = () => {
        let values: UpdateAuthor = {
            id: this.props.author.id.value,
            firstName: this.props.author.firstName.value,
            lastName: this.props.author.lastName.value,
            nationality: this.props.author.nationality.value,
            birthday: this.props.author.birthday.value
        }
        this.props.onSubmit(values, this.props.author.photo.value);
    }

    handleInput = (id: keyof AuthorFormModel, type: string, value: any) => {
        this.props.onInput(id, type, value);
    }

    handleDateChange = (date: Date | null) => {
        this.props.onDateChange(date)
    }

    handleChange = (event: any) => {
        this.props.onChange(event)
    }

    readFile = (file: File) => {
        this.props.onReadFile(file)
    }

    handleCancel = () => {
        this.props.onCancel()
    }


    render() {
        const image = this.props.bytearray ?
            <img src={this.props.bytearray} width="100" height="100" alt="author" /> :
            <AccountCircle color="secondary" style={{ fontSize: 100 }} />
        const loading = (this.props.updateAuthorStatus === RequestStatus.LOADING || 
            this.props.getAuthorDataStatus === RequestStatus.LOADING);
        // error only with update because get error will redirect to author view
        const error = (this.props.updateAuthorStatus === RequestStatus.ERROR);
        return (
            <form>
                <Grid alignItems="center" container spacing={3}>
                    <Grid item xs>
                        <Input
                            label='Nombre'
                            id='firstName'
                            type='text'
                            onChange={this.handleInput}
                            value={this.props.author.firstName.value}
                            error={this.props.author.firstName.error}
                            errorText={this.props.author.firstName.error ? 'Nombre inválido' : ''}
                            required
                        />
                    </Grid>
                    <Grid item xs>
                        <Input
                            label='Apellido'
                            id='lastName'
                            type='text'
                            onChange={this.handleInput}
                            value={this.props.author.lastName.value}
                            error={this.props.author.lastName.error}
                            errorText={this.props.author.lastName.error ? 'Apellido inválido' : ''}
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
                        <CountriesSelect
                            placeholder='Nacionalidad'
                            id='nationality'
                            value={this.props.author.nationality.value}
                            onChange={this.handleInput}
                            disabled={loading}
                            error={this.props.author.nationality.error}
                            errorText={this.props.author.nationality.error ? 'Por favor elija una nacionalidad' : ''}
                        />
                    </Grid>

                    <Grid item xs>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                fullWidth
                                error={this.props.author.birthday.error}
                                helperText={this.props.author.birthday.error ? 'Nacimiento mayor a fecha actual' : null}
                                color="secondary"
                                disableToolbar
                                required
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                margin="none"
                                id="date-picker-inline"
                                label="Nacimiento"
                                value={this.props.author.birthday.value}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs>
                        <MaterialButton
                            fullWidth
                            variant="contained"
                            component="label"
                            onChange={this.handleChange}
                            color='secondary'
                        >
                            Agrega una foto
                            <input
                                accept="image/*"
                                type="file"
                                style={{ display: "none" }}
                            />
                        </MaterialButton>
                        {this.props.author.photo.error && <Typography color='error'>La foto no puede superar los 100Kb</Typography>}
                    </Grid>
                </Grid>
                <div className='modify-author-buttons-container'>
                    <Button title="Cancelar" variant='outlined' disabled={false} onClick={this.handleCancel} />
                    <Button title='Guardar' variant='contained' disabled={!this.props.formValid} onClick={this.handleSubmit} />
                </div>
            </form>
        )
    }
}