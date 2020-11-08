import { IconButton, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Button, Input } from '../../../components/Form';
import { validateInput } from '../../../utils';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import classes from './RecoverPassword.module.css';


interface RecoverPasswordFormProps {
    onCancel(): void,
    onSubmit(email: string): void,
    loading: boolean,
}

const RecoverPasswordForm = (props: RecoverPasswordFormProps) => {
    const [email, setEmail] = useState({ value: '', type: 'email', error: false, touched: false });

    const handleEmailChange = (id: string, type: string, value: string) => {
        const error = !validateInput(type, value);
        setEmail({value, type, error, touched: true});
    }

    return (
        <div className={classes.container}>
            <Typography variant='h5'>{`Recuperación de contraseña`}</Typography>
            <Typography>{`Ingrese su email y le enviaremos los pasos a seguir. El email será valido por 2 horas.`}</Typography>
            <div className={classes.inputContainer}>
                <Input
                    label='Mail'
                    id='email'
                    type='email'
                    onChange={handleEmailChange}
                    value={email.value}
                    error={email.touched && email.error}
                    errorText={email.touched && email.error ? 'Email inválido' : ''}
                    required
                    disabled={props.loading}
                />
            </div>
            <div className={classes.buttonsContainer}>
                <IconButton
                    size='medium'
                    key='go-back-arrow'
                    onClick={props.onCancel}
                ><ChevronLeftIcon key='icon'/></IconButton>
                <Button
                    title='Recuperar'
                    disabled={email.error || !email.touched}
                    loading={props.loading}
                    onClick={() => props.onSubmit(email.value)}
                    variant='contained'
                    color='primary'
                />
            </div>
        </div>
    )
}


export default RecoverPasswordForm;
