import React, { Component } from 'react';
import { Checkbox, Input, RadioGroup, Button } from '../../../components/Form';
import { NewUser } from '../../../model';
import { RegisterFormModel } from '../../../model/Form/RegisterFormModel';
import validateInput from '../../../utils/validateInput';
import { genderToString, stringToGender } from '../../../utils/translateGender';


interface RegisterFormProps {
    loading: boolean,
    onSubmit(values: NewUser): void,
}

interface RegisterFormState {
    values: RegisterFormModel,
    formValid: boolean,
}

export default class RegisterForm extends Component<RegisterFormProps, RegisterFormState> {
    constructor(props: RegisterFormProps) {
        super(props);
        this.state = {
            values: {
                firstName: { value: '', type: 'text', error: true, touched: false },
                lastName: { value: '', type: 'text', error: true, touched: false },
                email: { value: '', type: 'email', error: true, touched: false },
                gender: { value: null, type: 'radio-group', error: true, touched: false },
                password: { value: '', type: 'password', error: true, touched: false },
                acceptTerms: { value: false, type: 'accept-terms', error: true, touched: false },
            },
            formValid: false,
        }
    }

    handleInput = (id: keyof RegisterFormModel, type: string, value: any) => {
        console.log(id, type, value);
        const error = !validateInput(type, value);
        const allTouched = Object.values(this.state.values).every(value => value.type === type ? true : value.touched === true);
        const anyErrors = Object.values(this.state.values).some(value => value.type === type ? error : value.error === true);
        this.setState({
            values: {
                ...this.state.values,
                [id]: { value, type, error, touched: true },
            },
            formValid: allTouched && !anyErrors,
        });
    }

    handleSubmit = () => {
        this.props.onSubmit({
            firstName: this.state.values.firstName.value,
            lastName: this.state.values.lastName.value,
            email: this.state.values.email.value,
            gender: this.state.values.gender.value,
            password: this.state.values.password.value,
        });
    }

    render() {
        const { loading } = this.props;
        return (
            <form>
                <div className='form-input'>
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
                        autoFocus
                    />
                </div>
                <div className='form-input'>
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
                </div>
                <div className='form-input'>
                    <Input
                        label='Mail'
                        id='email'
                        type='email'
                        onChange={this.handleInput}
                        value={this.state.values.email.value}
                        error={this.state.values.email.touched && this.state.values.email.error}
                        errorText={this.state.values.email.touched && this.state.values.email.error ? 'Mail inválido' : ''}
                        required
                        disabled={loading}
                    />
                </div>
                <RadioGroup
                    title='Género'
                    id='gender'
                    type='radio-group'
                    onChange={this.handleInput}
                    value={this.state.values.gender.value}
                    options={[
                        { id: 'M', value: 'Hombre' },
                        { id: 'F', value: 'Mujer' },
                        { id: 'A', value: 'Anónimo' },
                    ]}
                    error={this.state.values.gender.touched && this.state.values.gender.error}
                    errorText={'Elige un género'}
                    disabled={loading}
                />
                <div className='form-input'>
                    <Input
                        id='password'
                        label='Contraseña'
                        type='password'
                        onChange={this.handleInput}
                        value={this.state.values.password.value}
                        error={this.state.values.password.touched && this.state.values.password.error}
                        errorText={this.state.values.password.touched && this.state.values.password.error ? 'La contraseña debe ser alfanumérica' : ''}
                        required
                        disabled={loading}
                    />
                </div>
                <Checkbox
                    id='acceptTerms'
                    type='accept-terms'
                    label='Acepto los términos y condiciones'
                    checked={this.state.values.acceptTerms.value}
                    error={this.state.values.acceptTerms.touched && this.state.values.acceptTerms.error}
                    errorText='Debe aceptar los términos'
                    onChange={this.handleInput}
                    disabled={loading}
                />
                <Button
                    title='Crear'
                    disabled={!this.state.formValid}
                    loading={loading}
                    onClick={this.handleSubmit}
                />
            </form>
        )
    }
}
