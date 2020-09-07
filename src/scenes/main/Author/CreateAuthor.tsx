import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { NewAuthor } from "../../../model/NewAuthor";
import AuthorForm from "./AuthorForm";
import "./CreateAuthor.css"
import { AxiosResponse } from "axios";
import { RequestStatus } from "../../../model/consts/RequestStatus";
import { withRouter } from "react-router-dom";
import { Author } from "../../../model/Author";
import { createAuthor} from "../../../services/AuthorService";


export interface CreateAuthorState {
    createAuthorStatus: RequestStatus,
    error: any,
}

class CreateAuthor extends Component<any, CreateAuthorState> {
    constructor(props: any) {
        super(props)
        this.state = {
            createAuthorStatus: RequestStatus.NONE,
            error: null,
        }
    }

    handleSubmit = (values: NewAuthor, photo: File) => {
        this.setState({ ...this.state, createAuthorStatus: RequestStatus.LOADING, error: null });
        createAuthor(values, photo)
            .then((response: AxiosResponse<Author>) => {
                this.props.createAuthorCallback(RequestStatus.SUCCESS);
                this.setState({ ...this.state, createAuthorStatus: RequestStatus.SUCCESS });
                this.props.history.push('/');
            })
            .catch((error) => {
                this.props.createAuthorCallback(RequestStatus.ERROR);
                this.setState({ ...this.state, createAuthorStatus: RequestStatus.SUCCESS, error });
            })
    }

    render() {
        const { createAuthorStatus } = this.state;
        return (
            <div className='route-container' >
                <div className='form-container'>
                    <Typography align='center' variant='h5'>Creá un autor</Typography>
                    <AuthorForm
                        onSubmit={this.handleSubmit}
                        loading={createAuthorStatus === RequestStatus.LOADING}
                    />
                </div>
            </div>
        )
    }

}


export default withRouter(CreateAuthor);
