import React, {Component} from "react";
import {Typography} from "@material-ui/core";
import {NewBook} from "../../../model/NewBook";
import CreateBookForm from "./CreateBookForm";
import "./CreateBook.css"
import { createBook} from "../../../services/BookService";
import {AxiosResponse} from "axios";
import { Book } from "../../../model/Book";
import { Author } from "../../../model/Author";
import { getAuthors } from "../../../services/AuthorService";

interface CreateBookState {
    authors: Author[],
}

export default class CreateBook extends Component<{}, CreateBookState> {
     
    handleSubmit = (values: NewBook, photo: File) => {
        createBook(values, photo)
            .then((response: AxiosResponse<Book>) => console.log(response.data))
            .catch((e) => console.error(e))
    }

    componentDidMount(){
        getAuthors()
        .then((response: AxiosResponse<Author[]>) => {            
            this.setState((prevState: CreateBookState) => ({
                ...prevState,
                authors: response.data
            }))
        })
        .catch((e) => console.error(e))
    }

    render() {
        return (
            <div className='route-container' >
                <div className='form-container'>
                    <Typography align='center' variant='h5'>Creá un libro</Typography>
                    <CreateBookForm onSubmit={this.handleSubmit} authors={this.state.authors}/>
                </div>
            </div>
        )
    }

 }