<<<<<<< HEAD
import React, { Component } from "react";
import {Container, Typography } from "@material-ui/core";
import { NewAuthor } from "../../../model/NewAuthor";
import { register, ResponseRegister } from "../../../services/SessionService";
import { AxiosResponse } from 'axios';
import AuthorForm from "./AuthorForm";
import "./CreateAuthor.css"
import { createAuthor } from "../../../services/AuthorService";

 export default class CreateAuthor extends Component { 
     
    handleSubmit = (values: NewAuthor, photo: File) => {
        createAuthor(values, photo)
            .then(() => console.log("Bien"))
=======
import React, {Component} from "react";
import {Typography} from "@material-ui/core";
import {NewAuthor} from "../../../model/NewAuthor";
import AuthorForm from "./AuthorForm";
import "./CreateAuthor.css"
import {Author, createAuthor} from "../../../services/AuthorService";
import {AxiosResponse} from "axios";

export default class CreateAuthor extends Component {
     
    handleSubmit = (values: NewAuthor, photo: File) => {
        createAuthor(values, photo)
            .then((response: AxiosResponse<Author>) => console.log(response.data))
>>>>>>> origin/feature/AuthorView
            .catch((e) => console.error(e))
    }

    render() {
        return (
            <div className='route-container' >
<<<<<<< HEAD
                <div /**className='card-container'*/ >
                    <div className="spacing"></div>
=======
                <div className='form-container'>
>>>>>>> origin/feature/AuthorView
                    <Typography align='center' variant='h5'>Creá un autor</Typography>
                    <AuthorForm onSubmit={this.handleSubmit} />
                </div>
            </div>
        )
    }

 }