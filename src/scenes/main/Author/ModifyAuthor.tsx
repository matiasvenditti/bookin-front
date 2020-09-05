import React, {Component} from "react";
import {Typography} from "@material-ui/core";
import {NewAuthor} from "../../../model/NewAuthor";
import AuthorForm from "./AuthorForm";
import "./CreateAuthor.css"
import {Author, changeAuthorData, getAuthorData} from "../../../services/AuthorService";
import {AxiosResponse} from "axios";
import { UpdateAuthor } from "../../../model/UpdateAuthor";
import ModifyAuthorForm from "./ModifyAuthorForm";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { AuthorID } from "../../../model";

interface ModifyaAuthorProp extends RouteComponentProps<MatchParams> {
}

interface MatchParams {
    id: string
}

interface ModifyAuthorState {
    author: Author | null
}

class ModifyAuthor extends Component<ModifyaAuthorProp, ModifyAuthorState> {

    componentDidMount(){
        const id : string = this.props.match.params.id;
        const a : AuthorID = {id};
        getAuthorData(a)
        .then((response: AxiosResponse<Author>) => this.setState({author: response.data }))
        .catch((e) => console.error(e))
    }
     
    handleSubmit = (values: UpdateAuthor, photo: File) => {
        changeAuthorData(values, photo)
            .then((response: AxiosResponse<Author>) => console.log(response.data))
            .catch((e) => console.error(e))
    }

    render() {
        return (
            <div className='route-container' >
                <div className='form-container'>
                    <Typography align='center' variant='h5'>Creá un autor</Typography>
                    <ModifyAuthorForm author={this.state.author} onSubmit={this.handleSubmit} />
                </div>
            </div>
        )
    }

 }
 export default withRouter(ModifyAuthor);