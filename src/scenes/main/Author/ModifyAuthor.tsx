import React, {Component} from "react";
import {Typography} from "@material-ui/core";
import {NewAuthor} from "../../../model/NewAuthor";
import "./CreateAuthor.css"
import {Author, createAuthor} from "../../../services/AuthorService";
import {AxiosResponse} from "axios";
import ModifyAuthorForm from "./ModifyAuthorForm";
export default class ModifyAuthor extends Component{
         
    /**handleSubmit = (values: NewAuthor, photo: File) => {
        createAuthor(values, photo)
            .then((response: AxiosResponse<Author>) => console.log(response.data))
            .catch((e) => console.error(e))
    }

    render() {
        return (
            <div className='route-container' >
                <div className='form-container'>
                    <Typography align='center' variant='h5'>Modifica los datos del autor</Typography>
                    <ModifyAuthorForm onSubmit={this.handleSubmit} />
                </div>
            </div>
        )
    }**/
}