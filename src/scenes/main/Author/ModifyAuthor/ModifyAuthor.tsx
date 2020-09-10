import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import "../CreateAuthor/CreateAuthor.css"
import { changeAuthorData, getAuthorData } from "../../../../services/AuthorService";
import { AxiosResponse } from "axios";
import { UpdateAuthor } from "../../../../model";
import ModifyAuthorForm from "./ModifyAuthorForm";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Author } from "../../../../model/Author";
import { EditAuthorFormModel } from "../../../../model/Form/EditAuthorFormModel";
import { AuthorFormModel } from "../../../../model/Form/AuthorFormModel";
import validateInput from "../../../../utils/validateInput";
import photoUtils from "../../../../utils/photoUtils";
import { RequestStatus } from "../../../../model/consts/RequestStatus";
import Loader from "../../../../components/Loader/Loader";


interface ModifyaAuthorProp extends RouteComponentProps<MatchParams> {
    updateCallback(r: RequestStatus): void,
    getAuthorDataErrorCallback(): void,
}

interface MatchParams {
    id: string,
}

interface ModifyAuthorState {
    id: number,
    values: EditAuthorFormModel,
    bytearray: any,
    formValid: boolean,
    error: any,
    updateAuthorStatus: RequestStatus,
    getAuthorDataStatus: RequestStatus,
}

class ModifyAuthor extends Component<ModifyaAuthorProp, ModifyAuthorState> {
    constructor(props: ModifyaAuthorProp) {
        super(props);
        this.state = {
            id: parseInt(this.props.match.params.id),
            values: new EditAuthorFormModel(new Author()),
            bytearray: '',
            formValid: false,
            error: null,
            getAuthorDataStatus: RequestStatus.NONE,
            updateAuthorStatus: RequestStatus.NONE,
        }
    }

    componentDidMount() {
        this.setState({ ...this.state, getAuthorDataStatus: RequestStatus.LOADING });
        getAuthorData(this.state.id)
            .then((response: AxiosResponse<Author>) => {
                this.setState({ ...this.state, getAuthorDataStatus: RequestStatus.SUCCESS });
                const photo: string = `data:image/jpeg;base64,${response.data.photo}`;
                this.setState((prevState: ModifyAuthorState) => ({
                    ...prevState,
                    values: new EditAuthorFormModel(response.data),
                    bytearray: photo,
                }))
            })
            .catch((e) => {
                this.props.getAuthorDataErrorCallback();
                this.setState({ ...this.state, getAuthorDataStatus: RequestStatus.ERROR });
                this.props.history.push('/authors/' + this.state.id);
            });
    }

    handleSubmit = (values: UpdateAuthor, photo: File) => {
        this.setState({ ...this.state, updateAuthorStatus: RequestStatus.LOADING });
        changeAuthorData(values, photo)
            .then((response: AxiosResponse<Author>) => {
                this.props.updateCallback(RequestStatus.SUCCESS);
                this.setState({ ...this.state, updateAuthorStatus: RequestStatus.SUCCESS });
                this.props.history.push('/authors/' + this.state.id);
            })
            .catch((e) => {
                this.props.updateCallback(RequestStatus.ERROR);
                this.setState({ ...this.state, updateAuthorStatus: RequestStatus.ERROR });
            })
    }

    handleCancel = () => {
        this.props.history.push('/authors/' + this.state.id);
    }

    handleInput = (id: keyof AuthorFormModel, type: string, value: any) => {
        const error = !validateInput(type, value);
        const anyErrors = Object.values(this.state.values).some(value => value.type === type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                [id]: { value, type, error }
            },
            formValid: !anyErrors,
        });
    }


    handleDateChange = (date: Date | null) => {
        const error: boolean = date ? date > new Date() : false;
        const birthday = this.state.values.birthday;

        const anyErrors = Object.values(this.state.values).some(value => value.type === birthday.type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                birthday: { value: date, type: birthday.type, error: error }
            },
            formValid: !anyErrors,
        });
    }

    handleInputSelect = (object: any) => {
        const nacionalidad = object.target.value as string;
        const nationality = this.state.values.nationality;
        const error: boolean = false;

        const anyErrors = Object.values(this.state.values).some(value => value.type === nationality.type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                nationality: {
                    value: nacionalidad,
                    type: this.state.values.nationality.type,
                    error: false,
                },
            },
            formValid: !anyErrors,
        });
    }

    handleChange = (event: any) => {
        const file: File = event.target.files[0];
        const error: boolean = file.size > photoUtils.MAX_PHOTO_SIZE;
        const photo = this.state.values.photo;
        if (!error) this.readFile(file);

        const anyErrors = Object.values(this.state.values).some(value => value.type === photo.type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                photo: { value: !error && file, type: photo.type, error },
            },
            formValid: !anyErrors,
        });
    }

    readFile = (file: File) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.setState((prevState: ModifyAuthorState) => ({
                ...prevState,
                bytearray: reader.result
            }));
        }
    }

    render() {
        console.log('render modify author')
        const loading = this.state.getAuthorDataStatus === RequestStatus.LOADING;
        return (
            <div className='route-container' >
                {loading ? <Loader /> :
                    <div className='form-container'>
                        <Typography align='center' variant='h5'>Modificación del autor</Typography>
                        <ModifyAuthorForm
                            formValid={this.state.formValid}
                            bytearray={this.state.bytearray}
                            author={this.state.values}
                            onSubmit={this.handleSubmit}
                            onCancel={this.handleCancel}
                            onInput={this.handleInput}
                            onDateChange={this.handleDateChange}
                            onInputSelect={this.handleInputSelect}
                            onChange={this.handleChange}
                            onReadFile={this.readFile}
                        />
                    </div>
                }
            </div>
        )
    }

}
export default withRouter(ModifyAuthor);