import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Input } from '../../../components/Form';
import { RequestStatus } from '../../../model/consts/RequestStatus';
import { SessionService } from '../../../services';
import { validateInput } from '../../../utils';
import classes from './RecoverPassword.module.css';


interface RecoverPasswordProps extends RouteComponentProps {
    sendPasswordRecoveryCallback(status: RequestStatus): void,
    recoverPasswordTokenInvalidError(): void,
}

const RecoverPassword = (props: RecoverPasswordProps) => {
    const [password, setPassword] = useState({ value: '', type: 'password', error: false, touched: false });
    const [passwordRepeat, setPasswordRepeat] = useState({ value: '', type: 'password', error: false, touched: false });
    const [sendPasswordRecoveryStatus, setSendPasswordRecoveryStatus] = useState(RequestStatus.NONE);

    useEffect(() => {
        // get token from url and validate token
        // props.location.search
        const queryString = require('query-string');
        const parsed = queryString.parse(props.location.search);
        SessionService.resetPasswordValidateToken(parsed.token)
            .then(() => {
                console.log('validated token');
            })
            .catch((error) => {
                props.recoverPasswordTokenInvalidError();
                // props.history.push('/login');
            })
    }, [])

    const handleSubmit = (password: string) => {
        setSendPasswordRecoveryStatus(RequestStatus.LOADING);
        SessionService.sendPasswordRecovery(password)
            .then((response: any) => {
                props.sendPasswordRecoveryCallback(RequestStatus.SUCCESS);
                props.history.push('/login');
            })
            .catch((error: any) => {
                props.sendPasswordRecoveryCallback(RequestStatus.ERROR);
                props.history.push('/login');
            })
    };
    
    const handleInput = (id: string, type: string, value: string) => {
        const error = !validateInput(type, value);
        if (id === 'password') setPassword({value, type, error, touched: true});
        else setPasswordRepeat({value, type, error, touched: true});
    };


    const bothTouched = password.touched && passwordRepeat.touched;
    const noErrors = !password.error && !passwordRepeat.error;
    const notIdentical = password.value !== passwordRepeat.value;
    
    return (
        <div className='route-container'>
            <div className='card-container-narrow'>
                <Typography variant='h5'>{`Recuperación de contraseña`}</Typography>
                <Typography>{`Escriba su nueva contraseña!`}</Typography>
                <div className={classes.inputContainer}>
                    <Input
                        label='Contraseña'
                        id='password' type='password'
                        onChange={handleInput}
                        value={password.value}
                        error={password.touched && password.error}
                        errorText={password.touched && password.error ? 'Contraseña inválida' : ''}
                        required
                        disabled={sendPasswordRecoveryStatus === RequestStatus.LOADING}
                    />
                </div>
                <div className={classes.inputContainer}>
                    <Input
                        label='Repetir contraseña'
                        id='password-repeat' type='password'
                        onChange={handleInput}
                        value={passwordRepeat.value}
                        error={passwordRepeat.touched && passwordRepeat.error}
                        errorText={passwordRepeat.touched && passwordRepeat.error ? 'Contraseña inválida' : ''}
                        required
                        disabled={sendPasswordRecoveryStatus === RequestStatus.LOADING}
                    />
                </div>
                {(bothTouched && noErrors && notIdentical) && <Typography color='error'>Las contraseñas no son idénticas!</Typography>}
                <div className={classes.buttonsContainer}>
                    <Button
                        title='Finalizar'
                        disabled={!bothTouched || !noErrors || notIdentical}
                        loading={sendPasswordRecoveryStatus === RequestStatus.LOADING}
                        onClick={() => handleSubmit(password.value)}
                        variant='contained'
                        color='primary'
                    />
                </div>
            </div>
        </div>
    );
};


export default withRouter(RecoverPassword);
