import React, {Component} from "react";
import {Typography} from "@material-ui/core";
import {NewBook} from "../../../model/NewBook";
import CreateBookForm from "./CreateBookForm";
import "./CreateBook.css"
import { createBook} from "../../../services/BookService";
import {AxiosResponse} from "axios";
import { Book } from "../../../model/Book";

export default class CreateBook extends Component {
     
    handleSubmit = (values: NewBook, photo: File) => {
        createBook(values, photo)
            .then((response: AxiosResponse<Book>) => console.log(response.data))
            .catch((e) => console.error(e))
    }

    render() {
        return (
            <div className='route-container' >
                <div className='form-container'>
                    <Typography align='center' variant='h5'>Creá un libro</Typography>
                    <CreateBookForm onSubmit={this.handleSubmit} />
                </div>
            </div>
        )
    }

 }