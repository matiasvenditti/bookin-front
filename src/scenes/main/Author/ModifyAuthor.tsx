import React, {Component} from "react";
import {Typography} from "@material-ui/core";
import {NewAuthor} from "../../../model/NewAuthor";
import AuthorForm from "./AuthorForm";
import "./CreateAuthor.css"
import {changeAuthorData, getAuthorData} from "../../../services/AuthorService";
import {AxiosResponse} from "axios";
import { UpdateAuthor } from "../../../model/UpdateAuthor";
import ModifyAuthorForm from "./ModifyAuthorForm";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { AuthorID } from "../../../model";
import { Author } from "../../../model/Author";
import { EditAuthorFormModel } from "../../../model/Form/EditAuthorFormModel";
import { AuthorFormModel } from "../../../model/Form/AuthorFormModel";
import validateInput from "../../../utils/validateInput";

interface ModifyaAuthorProp extends RouteComponentProps<MatchParams> {
}

interface MatchParams {
    id: string
}

interface ModifyAuthorState {
    values: EditAuthorFormModel;
    bytearray: any;
    formValid: boolean,
    error: any,}

class ModifyAuthor extends Component<ModifyaAuthorProp, ModifyAuthorState> {

    maxFileSize: number = 100000;


    constructor(props: ModifyaAuthorProp){
        super(props);
        this.state = {
            values: new EditAuthorFormModel(new Author),
            bytearray: '',
            formValid: false,
            error: null,
        }
    }

    componentDidMount(){
        const id : string = this.props.match.params.id;
        const a : AuthorID = {id};
        getAuthorData(a)
        .then((response: AxiosResponse<Author>) => {
            const photo: string = `data:image/jpeg;base64,${response.data.photo}`;            
            this.setState((prevState: ModifyAuthorState) => ({
                ...prevState,
                values: new EditAuthorFormModel(response.data),
                bytearray: photo,
            }))
        })
        .catch((e) => console.error(e))
    }
     
    handleSubmit = (values: UpdateAuthor, photo: File) => {
        changeAuthorData(values, photo)
            .then((response: AxiosResponse<Author>) => console.log(response.data))
            .catch((e) => console.error(e))
    }

    handleCancel = () => {
        console.log('cancel')
    }

    handleInput = (id: keyof AuthorFormModel, type: string, value: any) => {
        const error = !validateInput(type, value);
        const anyErrors = Object.values(this.state.values).some(value => value.type === type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                [id]: {value, type, error}
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
                birthday: {value: date, type: birthday.type, error: error}
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
        const error: boolean = file.size >= this.maxFileSize
        const photo = this.state.values.photo;
        this.readFile(file);

        const anyErrors = Object.values(this.state.values).some(value => value.type === photo.type ? error : value.error);
        this.setState({
            values: {
                ...this.state.values,
                photo: {value: file, type: photo.type, error: error},
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
        return (
            <div className='route-container' >
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
                    onReadFile={this.readFile}/>
                </div>
            </div>
        )
    }

 }
 export default withRouter(ModifyAuthor);