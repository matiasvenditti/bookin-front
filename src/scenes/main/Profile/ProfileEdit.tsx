import React, { Component } from 'react'
import validateInput from '../../../utils/validateInput';
import { UserEditFormModel } from '../../../model/Form/UserEditFormModel';
import { EditVar } from '../../../model/consts/EditVar';
import { Button, Input, RadioGroup } from '../../../components/Form';
import { User } from '../../../model';
import { genderToString, stringToGender } from '../../../utils/translateGender';


interface ProfileEditProps {
    loading: boolean,
    error: boolean,
    data: User,
    editVariable: EditVar,
    onSubmit(values: User): void,
    onCancel(): void,
}

interface ProfileEditState {
    values: UserEditFormModel,
    formValid: boolean,
    error: any,
}

class ProfileEdit extends Component<any, ProfileEditState> {
    constructor(props: ProfileEditProps) {
        super(props);
        this.state = {
            values: {
                firstName: { value: props.data.firstName, type: 'text', error: false, touched: false },
                lastName: { value: props.data.lastName, type: 'text', error: false, touched: false },
                email: { value: props.data.email, type: 'email', error: false, touched: false },
                gender: { value: props.data.gender, type: 'radio-group', error: false, touched: false },
            },
            formValid: false,
            error: null,
        }
    }

    handleInput = (id: keyof UserEditFormModel, type: string, value: any) => {
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
        this.setState({
            ...this.state,
            values: {
                ...this.state.values,
                [id]: { value: type === 'radio-group' ? stringToGender(value) : value, type, error, touched: true },
            },
            formValid: !allInitialValue && allTouched && !anyErrors,
        });
    }

    handleSubmit = () => {
        this.props.onSubmit({
            id: -1,
            firstName: this.state.values.firstName.value,
            lastName: this.state.values.lastName.value,
            email: this.state.values.email.value,
            password: '',
            gender: this.state.values.gender.value,
            photo: null,
        });
    };

    handleCancel = () => {
        this.props.onCancel()
    }

    render() {
        return (
            <div className='profile-edit-form-container'>
                <form>
                    {this.renderInputs()}
                    <div className='profile-edit-buttons-container'>
                        <Button
                            title='Guardar'
                            disabled={!this.state.formValid}
                            onClick={this.handleSubmit}
                        />
                        <Button
                            title='Cancelar'
                            disabled={false}
                            onClick={this.handleCancel}
                        />
                    </div>
                </form>
            </div>
        );
    }

    renderInputs() {
        switch (this.props.editVariable) {
            case EditVar.NAME:
                return ([
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
                    />,
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
                    />,
                ]);
            case EditVar.EMAIL:
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
            case EditVar.GENDER:
                return ([
                    <RadioGroup
                        title='Género'
                        id='gender'
                        key='gender'
                        type='radio-group'
                        onChange={this.handleInput}
                        value={genderToString(this.state.values.gender.value)}
                        options={['Hombre', 'Mujer', 'Anónimo']}
                        error={this.state.values.gender.error}
                        errorText={'Elige un género'}
                    />
                ]);
            default: return (
                <div>!! form inputs returned default method !!</div>
            )
        }
    }
}


export default ProfileEdit;
