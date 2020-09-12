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
import { RequestStatus } from "../../../model/consts/RequestStatus";
import { withRouter, RouteComponentProps } from "react-router-dom";
interface CreateBookState {
    authors: Author[],
    status: RequestStatus
}
interface CreateBookProps extends RouteComponentProps {
    createBookCallback: (status: RequestStatus) => void
}
class CreateBook extends Component<CreateBookProps, CreateBookState> {
    constructor(props: any){
        super(props);
        this.state = {
            authors: [],
            status: RequestStatus.NONE
        }
    }
    handleSubmit = (values: NewBook, photo: File) => {
        createBook(values, photo)
            .then((response: AxiosResponse<Book>) => {
                this.props.createBookCallback(RequestStatus.SUCCESS);
                this.setState({ ...this.state, status: RequestStatus.SUCCESS});
                this.props.history.push('/books/' + response.data.id)
            })
            .catch((e) => { 
                console.error(e);
                this.props.createBookCallback(RequestStatus.ERROR);
                this.setState({ ...this.state, status: RequestStatus.SUCCESS});
            })
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
                    <CreateBookForm 
                    onSubmit={this.handleSubmit}
                    authors={this.state.authors}
                    onCancel={this.props.history.goBack}
                    loading={this.state.status === RequestStatus.LOADING}                    />
                </div>
            </div>
        )
    }
 }
 export default withRouter(CreateBook);