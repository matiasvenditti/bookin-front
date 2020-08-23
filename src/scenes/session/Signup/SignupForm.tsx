import React, { Component } from 'react';
import { Checkbox, Input, RadioGroup, Button } from '../../../components/Form';
import validateInput from '../../../utils/validateInput';
import { NewUser } from '../../../model/NewUser';
import { Form } from '../../../model';

interface RegisterFormProps {
    onSubmit(values: NewUser): void,
}

interface RegisterFormState {
    values: Form,
    anyErrors: boolean,
}

export default class RegisterForm extends Component<RegisterFormProps, RegisterFormState> {
    constructor(props: RegisterFormProps) {
        super(props);
        this.state = {
            values: {
                firstName: { value: '', type: 'text', error: false },
                lastName: { value: '', type: 'text', error: false },
                email: { value: '', type: 'email', error: false },
                gender: { value: null, type: 'radio-group', error: false },
                password: { value: '', type: 'password', error: false },
                acceptTerms: { value: false, type: 'accept-terms', error: false },
            },
            anyErrors: true,
        }
    }

    handleSubmit = () => {
        const newValuesWithErrors: Form = this.state.values;
        let anyErrors: boolean = false;
        const values = this.state.values;
        Object.keys(this.state.values).map((key: string) => {
            const isInputValid = !validateInput(values[key].type, values[key].value);
            if (isInputValid) anyErrors = true;
            newValuesWithErrors[key].error = isInputValid;
        })
        if (anyErrors) {
            this.setState({ ...this.state, values: newValuesWithErrors });
        } else {
            let values: NewUser = {
                firstName: this.state.values.firstName.value,
                lastName: this.state.values.lastName.value,
                email: this.state.values.email.value,
                gender: this.state.values.gender.value,
                password: this.state.values.password.value,
            }
            this.props.onSubmit(values);
        };
    }

    handleInput = (id: keyof Form, type: string, value: any) => {
        const error: boolean = !validateInput(type, value);
        this.setState({
            values: {
                ...this.state.values,
                [id]: { value, type, error }
            },
            anyErrors: this.state.anyErrors && false
        });
    }

    render() {
        return (
            <form>
                <Input
                    label='Nombre'
                    id='firstName'
                    type='text'
                    onChange={this.handleInput}
                    value={this.state.values.firstName.value}
                    error={this.state.values.firstName.error}
                    errorText={this.state.values.firstName.error ? 'Nombre inválido' : ''}
                    required
                    autoFocus
                />
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
                <Input
                    label='Mail'
                    id='email'
                    type='email'
                    onChange={this.handleInput}
                    value={this.state.values.email.value}
                    error={this.state.values.email.error}
                    errorText={this.state.values.email.error ? 'Mail inválido' : ''}
                    required
                />
                <RadioGroup
                    title='Género'
                    id='gender'
                    type='radio-group'
                    onChange={this.handleInput}
                    value={this.state.values.gender.value}
                    options={['Hombre', 'Mujer', 'Anónimo']}
                    error={this.state.values.gender.error}
                    errorText={'Elige un género'}
                />
                <Input
                    id='password'
                    label='Contraseña'
                    type='password'
                    onChange={this.handleInput}
                    value={this.state.values.password.value}
                    error={this.state.values.password.error}
                    errorText={this.state.values.password.error ? 'Contraseña inválida' : ''}
                    required
                />
                <Checkbox
                    id='acceptTerms'
                    type='accept-terms'
                    label='Acepto los términos y condiciones'
                    checked={this.state.values.acceptTerms.value}
                    error={this.state.values.acceptTerms.error}
                    errorText='Debe aceptar los términos'
                    onChange={this.handleInput}
                />
                <Button
                    title='Crear'
                    disabled={this.state.anyErrors}
                    onClick={this.handleSubmit}
                />
            </form>
        )
    }
}
