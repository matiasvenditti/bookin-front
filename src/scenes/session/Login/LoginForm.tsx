import React, { Component } from 'react'
import { LoginUser } from '../../../model/LoginUser';
import { LoginFormModel } from '../../../model';
import { Input, Button } from '../../../components/Form';
import validateInput from '../../../utils/validateInput';
import classes from './Login.module.css';


interface LoginFormProps {
    loading: boolean,
    onSubmit(values: LoginUser): void,
    onPasswordRecover(): void,
}

interface LoginFormState {
    values: LoginFormModel,
    formValid: boolean,
}

export default class LoginForm extends Component<LoginFormProps, LoginFormState> {
    constructor(props: LoginFormProps) {
        super(props);
        this.state = {
            values: {
                email: { value: '', type: 'email', error: false, touched: false },
                password: { value: '', type: 'password', error: false, touched: false },
            },
            formValid: false,
        }
    }

    handleInput = (id: keyof LoginFormModel, type: string, value: any) => {
        const error = !validateInput(type, value);
        const allTouched = Object.values(this.state.values).every(value => value.type === type ? true : value.touched);
        const anyErrors = Object.values(this.state.values).some(value => value.type === type ? error : value.error);
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
            email: this.state.values.email.value,
            password: this.state.values.password.value,
        });
    }
    
    render() {
        const { loading } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.inputContainer}>
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
                <div className={classes.inputContainer}>
                    <Input
                        id='password'
                        label='Contraseña'
                        type='password'
                        onChange={this.handleInput}
                        value={this.state.values.password.value}
                        error={this.state.values.password.touched && this.state.values.password.error}
                        errorText={this.state.values.password.touched && this.state.values.password.error ? 'Contraseña inválida' : ''}
                        required
                        disabled={loading}
                    />
                </div>
                <div className={classes.buttonContainer}>
                    <Button
                        title='Ingresar'
                        disabled={!this.state.formValid}
                        loading={loading}
                        onClick={this.handleSubmit}
                        variant='contained'
                        color='primary'
                    />
                    <Button
                        title='No sé mi contraseña'
                        disabled={false}
                        loading={loading}
                        onClick={this.props.onPasswordRecover}
                        variant='text'
                        color='secondary'
                    />
                </div>
            </div>
        )
    }
}
