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
                name: { value: '', type: 'text', error: false },
                surname: { value: '', type: 'text', error: false },
                email: { value: '', type: 'email', error: false },
                genre: { value: null, type: 'radio-group', error: false },
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
                name: this.state.values.name.value,
                surname: this.state.values.surname.value,
                email: this.state.values.email.value,
                genre: this.state.values.genre.value,
                password: this.state.values.password.value,
            }
            this.props.onSubmit(values);
        };
    }

    handleInput = (id: keyof Form, type: string, value: any) => {
        const error: boolean = !validateInput(type, value);
        if (type === 'radio-group') console.log(value, type, error);
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
                    id='name'
                    type='text'
                    onChange={this.handleInput}
                    value={this.state.values.name.value}
                    error={this.state.values.name.error}
                    errorText={this.state.values.name.error ? 'Nombre inválido' : ''}
                    required
                    autoFocus
                />
                <Input
                    label='Apellido'
                    id='surname'
                    type='text'
                    onChange={this.handleInput}
                    value={this.state.values.surname.value}
                    error={this.state.values.surname.error}
                    errorText={this.state.values.surname.error ? 'Apellido inválido' : ''}
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
                    id='genre'
                    type='radio-group'
                    onChange={this.handleInput}
                    value={this.state.values.genre.value}
                    options={['Hombre', 'Mujer', 'Anónimo']}
                    error={this.state.values.genre.error}
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
