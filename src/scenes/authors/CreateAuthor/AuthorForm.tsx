import React, { Component } from 'react';
import { Button, Input, DatePicker, CountriesSelect } from '../../../components/Form';
import Grid from '@material-ui/core/Grid';
import { Button as MaterialButton, Typography } from '@material-ui/core';
import classes from './AuthorForm.module.css';
import { AccountCircle } from '@material-ui/icons';
import { AuthorFormModel } from '../../../model/Form/AuthorFormModel';
import { NewAuthor } from '../../../model/NewAuthor';
import { validateInput, PhotoUtils } from '../../../utils';


interface AuthorFormState {
    values: AuthorFormModel;
    bytearray: any;
    formValid: boolean
}

interface AuthorFormProps {
    loading: boolean,
    onSubmit(values: NewAuthor, photo: File): void;
    onCancel(): void;
    onLoadImageError(): void,
}

export default class AuthorForm extends Component<AuthorFormProps, AuthorFormState> {
    constructor(props: AuthorFormProps) {
        super(props);
        this.state = {
            values: {
                firstName: { value: '', type: 'text', error: true, touched: false },
                lastName: { value: '', type: 'text', error: true, touched: false },
                nationality: { value: '', type: 'select', error: true, touched: false },
                birthday: { value: null, type: 'date', error: true, touched: false },
                photo: { value: null, type: 'photo', error: true, touched: false },
            },
            bytearray: null,
            formValid: false,
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

    handleChangePhoto = (event: any) => {
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
                        this.setState({
                            ...this.state,
                            bytearray: reader.result
                        });
                    } else this.props.onLoadImageError();
                }
                image.onerror = () => {this.props.onLoadImageError()}
            }
            reader.onerror = () => {this.props.onLoadImageError()}
        }
    };

    render() {
        const { loading } = this.props;
        const image = this.state.bytearray ?
            <img src={this.state.bytearray} width="100" height="100" alt='author' /> :
            <AccountCircle color="secondary" style={{ fontSize: 100 }} />

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
                            error={this.state.values.firstName.touched && this.state.values.firstName.error}
                            errorText={this.state.values.firstName.touched && this.state.values.firstName.error ? 'Nombre inválido' : ''}
                            required
                            disabled={loading}
                        />
                    </Grid>
                    <Grid item xs>
                        <Input
                            label='Apellido'
                            id='lastName'
                            type='text'
                            onChange={this.handleInput}
                            value={this.state.values.lastName.value}
                            error={this.state.values.lastName.touched && this.state.values.lastName.error}
                            errorText={this.state.values.lastName.touched && this.state.values.lastName.error ? 'Apellido inválido' : ''}
                            required
                            disabled={loading}
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
                            value={this.state.values.nationality.value}
                            onChange={this.handleInput}
                            disabled={loading}
                            error={this.state.values.nationality.touched && this.state.values.nationality.error}
                            errorText={this.state.values.nationality.touched && this.state.values.nationality.error ? 'Por favor elija una nacionalidad' : ''}
                        />
                    </Grid>

                    <Grid item xs>
                        <DatePicker
                            error={this.state.values.birthday.touched && this.state.values.birthday.error}
                            helperText={this.state.values.birthday.touched && this.state.values.birthday.error ? 'Fecha inválida' : null}
                            required
                            id='birthday'
                            label='Nacimiento'
                            value={this.state.values.birthday.value}
                            onChange={this.handleInput}
                            disabled={loading}
                            maxDate={new Date()}
                        />
                    </Grid>
                    <Grid item xs>
                        <MaterialButton
                            fullWidth
                            variant="contained"
                            component="label"
                            onChange={this.handleChangePhoto}
                            disabled={loading}
                            color='secondary'
                        >
                            Agrega una foto
                            <input
                                accept='.png, .jpg, .jpeg'
                                type="file"
                                style={{ display: "none" }}
                            />
                        </MaterialButton>
                        {this.state.values.photo.error && this.state.values.photo.touched && <Typography color='error'>El tamaño de la imagen no puede superar los 100Kb</Typography>}
                    </Grid>
                </Grid>
                <div className={classes.createAuthorButtonsContainer}>
                    <Button title="Cancelar" variant='outlined' disabled={false} onClick={this.props.onCancel} loading={loading} />
                    <Button title='Crear Autor' variant='contained' disabled={!this.state.formValid} onClick={this.handleSubmit} loading={loading} />
                </div>
            </form>
        )
    }
}
