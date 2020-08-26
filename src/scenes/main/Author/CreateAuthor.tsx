import React, { Component } from "react";
import {Container, Typography } from "@material-ui/core";
import AuthorForm from './CreateAuthor'
import { NewAuthor } from "../../../model/NewAuthor";
import { register, ResponseRegister, createAuthor } from "../../../services/SessionService";
import { AxiosResponse } from 'axios';

 export default class CreateAuthor extends Component { 
     
    handleSubmit = (values: NewAuthor, photo: File) => {
        createAuthor(values, photo)
            .then((response: AxiosResponse<ResponseRegister>) => console.log(response))
            .catch((error) => console.error(error));
    }

    render() {
        return (
            <div /**className='route-container'*/ >
                <div /**className='card-container'*/ >
                    <Typography align='center' variant='h5'>Creá un autor</Typography>
                    <AuthorForm />
                </div>
            </div>
        )
    }

 }