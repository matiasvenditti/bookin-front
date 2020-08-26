import React, { Component } from "react";
import {Container, Typography } from "@material-ui/core";
import { NewAuthor } from "../../../model/NewAuthor";
import { register, ResponseRegister } from "../../../services/SessionService";
import { AxiosResponse } from 'axios';
import AuthorForm from "./AuthorForm";
import { createAuthor } from "../../../services/AuthorService";

 export default class CreateAuthor extends Component { 
     
    handleSubmit = (values: NewAuthor, photo: File) => {
        createAuthor(values, photo)
    }

    render() {
        return (
            <div /**className='route-container'*/ >
                <div /**className='card-container'*/ >
                    <Typography align='center' variant='h5'>Creá un autor</Typography>
                    <AuthorForm onSubmit={this.handleSubmit} />
                </div>
            </div>
        )
    }

 }