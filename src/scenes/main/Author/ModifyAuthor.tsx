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

interface ModifyaAuthorProp extends RouteComponentProps<MatchParams> {
}

interface MatchParams {
    id: string
}

interface ModifyAuthorState {
    author: Author
}

class ModifyAuthor extends Component<ModifyaAuthorProp, ModifyAuthorState> {

    constructor(props: ModifyaAuthorProp){
        super(props);
        this.state = {
            author: {
                id: 0,
                firstName: '',
                lastName: '',
                nationality: '',
                birthday: new Date(),
                photo: ''
            }
        }
    }

    componentDidMount(){
        const id : string = this.props.match.params.id;
        const a : AuthorID = {id};
        getAuthorData(a)
        .then((response: AxiosResponse<Author>) => this.setState((prevState: ModifyAuthorState) => ({
            ...prevState,
            author: response.data, 
        })))
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

    render() {
        return (
            <div className='route-container' >
                <div className='form-container'>
                    <Typography align='center' variant='h5'>Creá un autor</Typography>
                    <ModifyAuthorForm author={this.state.author} onSubmit={this.handleSubmit} onCancel={this.handleCancel} />
                </div>
            </div>
        )
    }

 }
 export default withRouter(ModifyAuthor);