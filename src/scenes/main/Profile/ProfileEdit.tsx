import React, { Component } from 'react'
import validateInput from "../../../utils/validateInput";
import { EditFormModel } from "../../../model/Form/EditFormModel";
import { RequestStatus } from "../../../model/consts/RequestStatus";
import { EditVar } from "../../../model/consts/EditVar";
import { Button, Input, RadioGroup } from "../../../components/Form";
import { UpdateUser } from "../../../model/UpdateUser";
import { ResponseUpdate, update } from "../../../services/SessionService";
import { AxiosResponse } from "axios";
import { saveLoginResponse } from "../../../services/AuthService";
import translateGender from "../../../utils/translateGender";

interface ProfileEditProps {
    data: {
        firstName: string,
        lastName: string,
        email: string,
        gender: string,
        photo: any,
        password: any,
    }
    editVariable: EditVar,
    onSubmit(values: UpdateUser): void,
    onCancel(): void,
}

interface ProfileEditState {
    values: EditFormModel,
    formValid: boolean,
    updateStatus: any,
    error: any,
    editVariable: EditVar,
}

export default class ProfileEdit extends Component<any, ProfileEditState> {
    constructor(props: ProfileEditProps) {
        super(props);
        this.state = {
            values: {
                firstName: { value: props.data.firstName, type: 'text', error: false },
                lastName: { value: props.data.lastName, type: 'text', error: false },
                email: { value: props.data.email, type: 'email', error: false },
                gender: { value: props.data.gender, type: 'radio-group', error: false },
                password: { value: props.data.password, type: 'password', error: false },
                photo: { value: props.data.photo, type: 'text', error: false }, //TODO figure out a way for def value.
            },
            formValid: false,
            updateStatus: RequestStatus.NONE,
            editVariable: props.editVariable,
            error: null,
        }
    }

    handleInput = (id: keyof EditFormModel, type: string, value: any) => {
        const error = !validateInput(type, value);
        const anyErrors = Object.values(this.state.values).some(value => value.type === type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                [id]: { value, type, error },
            },
            formValid: !anyErrors,
        });
    }

    // TODO replace internal request submit to parent callback
    handleSubmit = (values: UpdateUser) => {
        this.setState({ updateStatus: RequestStatus.LOADING, error: null });
        update(values)
            .then((response: AxiosResponse<ResponseUpdate>) => {
                saveLoginResponse(response);
                this.setState({ updateStatus: RequestStatus.SUCCESS, error: null });
                this.props.history.push('/profile');
            })
            .catch((error) => {
                this.setState({ updateStatus: RequestStatus.ERROR, error });
            });
    }

    handleSubmitTemp = () => {
        this.handleSubmit({
            firstName: this.state.values.firstName.value,
            lastName: this.state.values.lastName.value,
            email: this.state.values.email.value,
            gender: translateGender(this.state.values.gender.value),
            password: this.state.values.password.value,
            photo: this.state.values.photo.value,
        });
    }

    handleCancel = () => {
        this.props.onCancel({})
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
                            onClick={this.handleSubmitTemp}
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
        switch (this.state.editVariable) {
            case EditVar.NAME:
                return ([
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
                    />,
                    <Input
                        label='Apellido'
                        id='lastName'
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
                        type='radio-group'
                        onChange={this.handleInput}
                        value={this.state.values.gender.value}
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
