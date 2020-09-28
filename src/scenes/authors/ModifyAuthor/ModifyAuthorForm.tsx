import React, { Component } from 'react';
import { Button, Input, CountriesSelect, DatePicker } from '../../../components/Form';
import Grid from '@material-ui/core/Grid';
import { Button as MaterialButton, Typography } from '@material-ui/core';
import classes from "./ModifyAuthorForm.module.css";
import { AccountCircle } from '@material-ui/icons';
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
    onChange(event: any): void,
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

    handleChange = (event: any) => {
        this.props.onChange(event)
    }

    handleCancel = () => {
        this.props.onCancel()
    }


    render() {
        const image = (this.props.bytearray ?
            <img src={this.props.bytearray} width="100" height="100" alt="author" /> 
            :
            <AccountCircle color="secondary" style={{ fontSize: 100 }} />
        );
        
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
                        <div className={classes.center}>
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
                            error={this.props.author.nationality.error}
                            errorText={this.props.author.nationality.error ? 'Por favor elija una nacionalidad' : ''}
                        />
                    </Grid>
                    <Grid item xs>
                        <DatePicker
                            error={this.props.author.birthday.error}
                            helperText={this.props.author.birthday.error ? 'Nacimiento mayor a fecha actual' : null}
                            required
                            id='birthday'
                            label='Nacimiento'
                            value={this.props.author.birthday.value}
                            onChange={this.handleInput}
                            maxDate={new Date()}
                        />
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
                <div className={classes.modifyAuthorButtonsContainer}>
                    <Button title="Cancelar" variant='outlined' disabled={false} onClick={this.handleCancel} />
                    <Button title='Guardar' variant='contained' disabled={!this.props.formValid} onClick={this.handleSubmit} />
                </div>
            </form>
        )
    }
}