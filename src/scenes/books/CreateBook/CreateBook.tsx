import React, {Component} from "react";
import {Typography} from "@material-ui/core";
import {NewBook} from "../../../model/NewBook";
import CreateBookForm from "./CreateBookForm";
import "./CreateBook.css"
import {AxiosResponse} from "axios";
import { Book } from "../../../model/Book";
import { Author } from "../../../model/Author";
import { RequestStatus } from "../../../model/consts/RequestStatus";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { AuthorsService, BooksService } from '../../../services';


interface CreateBookState {
    authors: Author[],
    status: RequestStatus
}

interface CreateBookProps extends RouteComponentProps {
    createBookCallback: (status: RequestStatus) => void,
    onLoadImageError(): void,
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
        BooksService.createBook(values, photo)
            .then((response: AxiosResponse<Book>) => {
                this.props.createBookCallback(RequestStatus.SUCCESS);
                this.setState({ ...this.state, status: RequestStatus.SUCCESS});
                this.props.history.push('/books/' + response.data.id)
            })
            .catch((e) => { 
                this.props.createBookCallback(RequestStatus.ERROR);
                this.setState({ ...this.state, status: RequestStatus.SUCCESS});
            });
    }

    componentDidMount(){
        AuthorsService.getAuthors()
            .then((response: AxiosResponse<Author[]>) => {            
                this.setState((prevState: CreateBookState) => ({
                    ...prevState,
                    authors: response.data
                }))
            })
            .catch((e: any) => console.error(e));
    }

    render() {
        return (
            <div className='route-container' >
                <div className='form-container'>
                    <Typography align='center' variant='h4' style={{margin: 20, fontWeight: 'bold'}}>Creá un libro</Typography>
                    <CreateBookForm 
                        onSubmit={this.handleSubmit}
                        authors={this.state.authors}
                        onCancel={this.props.history.goBack}
                        loading={this.state.status === RequestStatus.LOADING}
                        onLoadImageError={this.props.onLoadImageError}
                    />
                </div>
            </div>
        );
    }
}


export default withRouter(CreateBook);
