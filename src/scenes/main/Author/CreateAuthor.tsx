import React, {Component} from "react";
import {Typography} from "@material-ui/core";
import {NewAuthor} from "../../../model/NewAuthor";
import AuthorForm from "./AuthorForm";
import "./CreateAuthor.css"
import { createAuthor} from "../../../services/AuthorService";
import {AxiosResponse} from "axios";
import { Author } from "../../../model/Author";

export default class CreateAuthor extends Component {
     
    handleSubmit = (values: NewAuthor, photo: File) => {
        createAuthor(values, photo)
            .then((response: AxiosResponse<Author>) => console.log(response.data))
            .catch((e) => console.error(e))
    }

    render() {
        return (
            <div className='route-container' >
                <div className='form-container'>
                    <Typography align='center' variant='h5'>Creá un autor</Typography>
                    <AuthorForm onSubmit={this.handleSubmit} />
                </div>
            </div>
        )
    }

 }