import React, { Component } from 'react';
import { Checkbox, Input, RadioGroup, Button } from '../../../components/Form';
import { FormValue } from '../../../model/FormValue';
import getValidator from '../../../utils/validateInput';
import validateInput from '../../../utils/validateInput';
import { NewUser } from '../../../model/NewUser';
import { TextField } from '@material-ui/core';

interface RegisterFormProps {
    onSubmit(values: NewUser): void,
}

interface RegisterFormState {
    values: {
        name: FormValue,
        surname: FormValue,
        email: FormValue,
        sex: FormValue,
        password: FormValue,
        acceptTerms: FormValue,
    },
    anyErrors: boolean,
}

export default class RegisterForm extends Component<RegisterFormProps, RegisterFormState> {
    constructor(props: RegisterFormProps) {
        super(props);

        this.state = {
            values: {
                name: { value: '', error: false },
                surname: { value: '', error: false },
                email: { value: '', error: false },
                sex: { value: null, error: false },
                password: { value: '', error: false },
                acceptTerms: { value: false, error: false },
            },
            anyErrors: true,
        }
    }

    handleSubmit = () => {
        const anyErrors: boolean = Object.values(this.state.values).some(value => value.error);
        if (anyErrors) {
            console.log('some errors');
        } else {
            let values: NewUser = {
                name: this.state.values.name.value,
                surname: this.state.values.surname.value,
                email: this.state.values.email.value,
                sex: this.state.values.sex.value,
                password: this.state.values.password.value,
            }
            this.props.onSubmit(values);
        };
    }

    handleInput = (e: any) => {
        const id: keyof RegisterFormState = e.target.id;
        const value: any = e.target.value;
        const error: boolean = !validateInput(e.target.type, value);
        this.setState({
            ...this.state,
            values: {
                ...this.state.values,
                [id]: { value, error }
            },
            anyErrors: this.state.anyErrors && false
        });
    }

    handleRadioGroupInput = (e: any) => {
        const id: keyof RegisterFormState = e.target.name;
        const value: any = e.target.value;
        const error: boolean = value === null;
        this.setState({
            ...this.state,
            values: {
                ...this.state.values,
                [id]: { value, error }
            },
            anyErrors: this.state.anyErrors && false
        });
    }

    render() {
        return (
            <form>
                <Input
                    label='Nombre'
                    id='name'
                    type='name'
                    onChange={(e) => this.handleInput(e)}
                    value={this.state.values.name.value}
                    error={this.state.values.name.error}
                    errorText={this.state.values.name.error ? 'Nombre inválido' : ''}
                    required
                    autoFocus
                />
                <Input
                    label='Apellido'
                    id='surname'
                    type='name'
                    onChange={(e) => this.handleInput(e)}
                    value={this.state.values.surname.value}
                    error={this.state.values.surname.error}
                    errorText={this.state.values.surname.error ? 'Apellido inválido' : ''}
                    required
                />
                <Input
                    label='Mail'
                    id='email'
                    type='email'
                    onChange={(e) => this.handleInput(e)}
                    value={this.state.values.email.value}
                    error={this.state.values.email.error}
                    errorText={this.state.values.email.error ? 'Mail inválido' : ''}
                    required
                />
                <RadioGroup
                    title='Género'
                    id='sex'
                    type='radiogroup-sex'
                    onChange={(e) => this.handleRadioGroupInput(e)}
                    value={this.state.values.sex.value}
                    options={['Hombre', 'Mujer', 'Anónimo']}
                    error={this.state.values.sex.error}
                    errorText={this.state.values.sex.error ? 'Mail inválido' : ''}
                />
                <Input
                    label='Contraseña'
                    id='password'
                    type='password'
                    onChange={(e) => this.handleInput(e)}
                    value={this.state.values.password.value}
                    error={this.state.values.password.error}
                    errorText={this.state.values.password.error ? 'Contraseña inválida' : ''}
                    required
                />
                <Checkbox
                    label='Acepto los términos y condiciones'
                    checked={this.state.values.acceptTerms.value}
                    error={this.state.values.acceptTerms.error}
                    errorText='Debe aceptar los términos'
                    onChange={(e) => this.handleInput(e)}
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
