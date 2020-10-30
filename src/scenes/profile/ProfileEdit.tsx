import React, { Component } from 'react'
import { validateInput } from '../../utils';
import { UserEditFormModel } from '../../model/Form/UserEditFormModel';
import { EditVar } from '../../model/consts/EditVar';
import { Button, Input, RadioGroup } from '../../components/Form';
import { User } from '../../model';
import { Typography } from '@material-ui/core';
import { allGenders } from '../../utils/consts';
import { ChangePasswords } from '../../model/ChangePasswords';


interface ProfileEditProps {
    loading: boolean,
    error: boolean,
    data: User,
    editVariable: EditVar,
    onSubmit(values: User): void,
    changePassword(passwords: ChangePasswords): void, 
    onCancel(): void,
}

interface ProfileEditState {
    values: UserEditFormModel,
    oldPassword: string,
    formValid: boolean,
    error: any,
    counter: number,
    verified: boolean,
}

class ProfileEdit extends Component<any, ProfileEditState> {
    constructor(props: ProfileEditProps) {
        super(props);
        this.state = {
            values: {
                firstName: { value: props.data.firstName, type: 'text', error: false, touched: false },
                lastName: { value: props.data.lastName, type: 'text', error: false, touched: false },
                email: { value: props.data.email, type: 'email', error: false, touched: false },
                password: { value: props.data.password, type: 'password', error: false, touched: false},
                gender: { value: props.data.gender, type: 'radio-group', error: false, touched: false },
                verification: { value: '', type: 'alphanuemric', error: false, touched: false},
            },
            oldPassword: '',
            formValid: false,
            error: null,
            counter: 0,
            verified: false,
        }
    }

    handleInput = (id: keyof UserEditFormModel, type: string, value: any) => {
        const number: number = this.state.counter+1
        const pass = this.state.values.password.value;
        const error = !validateInput(type, value);
        const allTouched = () => {
            if (id === 'firstName' || id === 'lastName') {
                return this.state.values.firstName.touched || this.state.values.lastName.touched
            } else return true;
        };
        const anyErrors = Object.values(this.state.values).some(value => value.type === type ? error : value.error);
        const allInitialValue = Object.keys(this.state.values).every(key => {
            if (key === id) return value === this.props.data[id];
            else return this.state.values[key].value === this.props.data[key];
        });
        if (this.state.counter === 1){
                    this.setState({
                ...this.state,
                values: {
                    ...this.state.values,
                    [id]: { value, type, error, touched: true },
                },
                oldPassword: pass,
                formValid: !allInitialValue && allTouched && !anyErrors,
                counter: number,
            });
        }else {
            this.setState({
                ...this.state,
                values: {
                    ...this.state.values,
                    [id]: { value, type, error, touched: true },
                },
                formValid: !allInitialValue && allTouched && !anyErrors,
                counter: number,
            });
        }

    }

    handleSubmit = () => {
        this.props.onSubmit({
            id: -1,
            firstName: this.state.values.firstName.value,
            lastName: this.state.values.lastName.value,
            email: this.state.values.email.value,
            password: this.state.values.password.value,
            gender: this.state.values.gender.value,
            photo: null,
        });
    };

    handlePasswordChange = () => {
        var passwords: ChangePasswords = {
            oldPassword: this.state.oldPassword,
            password: this.state.values.password.value
        }
        this.props.changePassword(passwords)
    }

    handleCancel = () => {
        this.props.onCancel()
    }

    verifyPassword = () => {
        const value = this.state.values.verification.value
        const type = this.state.values.verification.type
        const touched = this.state.values.verification.touched
        if(this.state.oldPassword === this.state.values.verification.value){
            this.setState({
                ...this.state,
                verified: true
            });
        } else {
            this.setState({
                ...this.state,
                values: {
                    ...this.state.values,
                    verification: {value , type , error: true, touched }
                }
            });
        }
    }

    render() {
        return (
            <div className='profile-edit-form-container'>
                <form>
                    {this.renderInputs()}
                    {this.renderButtons()}
                </form>
            </div>
        );
    }

    renderInputs() {
        switch (this.props.editVariable) {
            case EditVar.NAME:
                return ([
                    <div className='form-input' key='form-input-firtname'>
                        <Input
                            label='Nombre'
                            id='firstName'
                            key='firstName'
                            type='text'
                            onChange={this.handleInput}
                            value={this.state.values.firstName.value}
                            error={this.state.values.firstName.error}
                            errorText={this.state.values.firstName.error ? 'Nombre inválido' : ''}
                            required
                            autoFocus
                        />
                    </div>,
                    <div className='form-input' key='form-input-lastname    '>
                        <Input
                            label='Apellido'
                            id='lastName'
                            key='lastName'
                            type='text'
                            onChange={this.handleInput}
                            value={this.state.values.lastName.value}
                            error={this.state.values.lastName.error}
                            errorText={this.state.values.lastName.error ? 'Apellido inválido' : ''}
                            required
                        />
                    </div>,
                ]);
                case EditVar.EMAIL:
                    //   TODO: Uncomment or change when change-email functionality is ready
                     return ([
                         <Input
                             label='Mail'
                             id='email'
                             key='email'
                             type='email'
                             onChange={this.handleInput}
                             value={this.state.values.email.value}
                             error={this.state.values.email.error}
                             errorText={this.state.values.email.error ? 'Mail inválido' : ''}
                             required
                         />
                    ]);
                case EditVar.PASSWORD:
                    // esta deshabilitado en el back, creo
                    if(this.state.verified){
                        return ([
                        <Input
                             label='Password'
                             id='password'
                             key='password'
                             type='password'
                             onChange={this.handleInput}
                             value={this.state.values.password.value}
                             error={this.state.values.password.error}
                             errorText={this.state.values.password.error ? 'Contraseña inválida' : ''}
                             required
                         />
                        ]);
                    }else{
                     return ([
                            <Input
                                label='Verification'
                                id='verification'
                                key='verification'
                                type='password'
                                onChange={this.handleInput}
                                value={this.state.values.verification.value}
                                error={this.state.values.verification.error}
                                errorText={this.state.values.verification.error ? 'La contraseña ingresada no coincide con la anterior' : ''}
                            /> 
                    ]);
                }
            case EditVar.GENDER:
                return ([
                    <RadioGroup
                        title='Género'
                        id='gender'
                        key='gender'
                        type='radio-group'
                        onChange={this.handleInput}
                        valueId={this.state.values.gender.value}
                        options={allGenders}
                        error={this.state.values.gender.error}
                        errorText={'Elige un género'}
                    />
                ]);
            default: return (
                <div>!! form inputs returned default method !!</div>
            )
        }
    }

    renderButtons() {
        switch (this.props.editVariable) {
            case EditVar.PASSWORD:
                if (this.state.verified){
                return ([
                    <div className='profile-edit-buttons-container'>
                    <Button
                        color='primary'
                        variant='contained'
                        title='Guardar'
                        disabled={!this.state.formValid}
                        onClick={this.handlePasswordChange}
                    />
                    <Button
                        variant='outlined'
                        title='Cancelar'
                        disabled={false}
                        onClick={this.handleCancel}
                    />
                </div>
                ]);
                } else {
                    return ([
                        <div className='profile-edit-buttons-container'>
                        <Button
                            color='primary'
                            variant='contained'
                            title='Verificar contraseña'
                            disabled={!this.state.formValid}
                            onClick={this.verifyPassword}
                        />
                        <Button
                            variant='outlined'
                            title='Cancelar'
                            disabled={false}
                            onClick={this.handleCancel}
                        />
                    </div>
                    ]);
                }
            case EditVar.EMAIL:
                return ([
                    <div className='profile-edit-buttons-container'>
                    <Button
                        color='primary'
                        variant='contained'
                        title='Guardar'
                        disabled={!this.state.formValid}
                        onClick={this.handleSubmit}
                    />
                    <Button
                        variant='outlined'
                        title='Cancelar'
                        disabled={false}
                        onClick={this.handleCancel}
                    />
                </div>
                ]);
            default: 
                return ([
                    <div className='profile-edit-buttons-container'>
                    <Button
                        color='primary'
                        variant='contained'
                        title='Guardar'
                        disabled={!this.state.formValid}
                        onClick={this.handleSubmit}
                    />
                    <Button
                        variant='outlined'
                        title='Cancelar'
                        disabled={false}
                        onClick={this.handleCancel}
                    />
                </div>
                ]);
        }
    }
}


export default ProfileEdit;
