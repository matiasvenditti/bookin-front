import React, { Component } from 'react';
import { Checkbox, Input, RadioGroup, Button } from '../../../components/Form';
import { NewUser } from '../../../model';
import {Form, FormValue} from '../../../model';
import {requiredString, requiredTrue, Validator} from "../../../utils/Validators/RequiredValidator";
import {emailValidator, passwordValidator, textValidator} from "../../../utils/Validators/validateInput";

interface RegisterFormProps {
    onSubmit(values: NewUser): void,
}

interface RegisterFormState {
    values: Form,
}

export default class RegisterForm extends Component<RegisterFormProps, RegisterFormState> {
    constructor(props: RegisterFormProps) {
        super(props);
        this.state = {
            values:{
                firstName: { value: '', type: 'text', error: true, touched: false, validators: [requiredString, textValidator] },
                lastName: { value: '', type: 'text', error: true, touched: false, validators: [requiredString, textValidator] },
                email: { value: '', type: 'email', error: true, touched: false, validators: [requiredString, emailValidator] },
                gender: { value: null, type: 'radio-group', error: true, touched: false, validators: [requiredString] },
                password: { value: '', type: 'password', error: true, touched: false, validators: [requiredString, passwordValidator] },
                acceptTerms: { value: false, type: 'accept-terms', error: true, touched: false, validators: [requiredTrue] },
            }
        }
    }

    handleSubmit = () => {
        const newValuesWithErrors: Form = this.state.values;
        let anyErrors: boolean = false;
        const values = this.state.values;
        Object.keys(this.state.values).map((key: string) => {
            const formValue: FormValue = values[key];
            const isInputValid: boolean = formValue.validators.some((validator: Validator) => !validator(formValue.value));   
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

    render() {
        return (
            <form>
                <Input
                    label='Nombre'
                    id='firstName'
                    type='text'
                    onChange={this.handleInput}
                    value={this.state.values.firstName.value}       
                    error={this.state.values.firstName.touched && this.state.values.firstName.error}
                    errorText={this.state.values.firstName.touched && this.state.values.firstName.error ? 'Nombre inválido' : ''}
                    required
                    autoFocus
                />
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
                <Input
                    label='Mail'
                    id='email'
                    type='email'
                    onChange={this.handleInput}
                    value={this.state.values.email.value}
                    error={this.state.values.email.touched && this.state.values.email.error}
                    errorText={this.state.values.email.touched && this.state.values.email.error ? 'Mail inválido' : ''}
                    required
                />
                <RadioGroup
                    title='Género'
                    id='gender'
                    type='radio-group'
                    onChange={this.handleInput}
                    value={this.state.values.gender.value}
                    options={['Hombre', 'Mujer', 'Anónimo']}
                    error={this.state.values.gender.touched && this.state.values.gender.error}  
                    errorText={'Elige un género'}
                />
                <Input
                    id='password'
                    label='Contraseña'
                    type='password'
                    onChange={this.handleInput}
                    value={this.state.values.password.value}
                    error={this.state.values.password.touched && this.state.values.password.error}
                    errorText={this.state.values.password.touched && this.state.values.password.error ? 'Contraseña inválida' : ''}
                    required
                />
                <Checkbox
                    id='acceptTerms'
                    type='accept-terms'
                    label='Acepto los términos y condiciones'
                    checked={this.state.values.acceptTerms.value}
                    error={this.state.values.acceptTerms.touched && this.state.values.acceptTerms.error}    
                    errorText='Debe aceptar los términos'
                    onChange={this.handleInput}
                />
                <Button
                    title='Crear'
                    disabled={this.isFormValid()}                    
                    onClick={this.handleSubmit}
                />
            </form>
        )
    }
}
