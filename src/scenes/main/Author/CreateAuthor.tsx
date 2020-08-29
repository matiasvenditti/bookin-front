import React, {Component} from "react";
import {Typography} from "@material-ui/core";
import {NewAuthor} from "../../../model/NewAuthor";
import AuthorForm from "./AuthorForm";
import "./CreateAuthor.css"
import {createAuthor} from "../../../services/AuthorService";

export default class CreateAuthor extends Component {
     
    handleSubmit = (values: NewAuthor, photo: File) => {
        createAuthor(values, photo)
            .then(() => console.log("Bien"))
            .catch((e) => console.error(e))
    }

    render() {
        return (
            <div className='route-container' >
                <div >
                    <Typography align='center' variant='h5'>Creá un autor</Typography>
                    <AuthorForm onSubmit={this.handleSubmit} />
                </div>
            </div>
        )
    }

 }