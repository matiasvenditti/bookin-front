import { Typography } from "@material-ui/core";
import { TheatersOutlined } from "@material-ui/icons";
import { AxiosResponse } from "axios";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Book, NewReview, User } from "../../../model";
import { RequestStatus } from "../../../model/consts/RequestStatus";
import { UserService } from "../../../services";
import ReviewService from "../../../services/ReviewService";
import CreateReviewForm from "./CreateReviewForm";

interface CreateReviewState{
    user: User;
    bookId: string;
}

interface CreateReviewProps extends RouteComponentProps<MatchParams> {
    updateCallback(r: RequestStatus): void,

    getBookDataErrorCallback(): void,
}

interface MatchParams {
    id: string,
}

export default class CreateReview extends React.Component<CreateReviewProps, CreateReviewState>{

    constructor(props: any){
        super(props);
        this.state = {
            user: {
                id: -1,
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                gender: '',
                photo: null,
            },
            bookId: this.props.match.params.id
        }
    }
    
    componentDidMount() {
        this.getData();
    }

    getData(){
        UserService.getUserData()
            .then((response: AxiosResponse<User>) => {
                this.setState((prevState: CreateReviewState) => ({
                    ...prevState,
                    user: response.data,
                }))
            })
            .catch((error: any) => {

            });
    }

    handleSubmit = (values: NewReview, userId: string, bookId: string ) => {
        ReviewService.createReview(values, userId, bookId)
    }

    render() {
        const id = this.state.user.id;
        const cheapToString = '' + id
        return (
            <div>
                <div>
                    <Typography align='left' >Escribí una riseña</Typography>
                    <CreateReviewForm
                        onSubmit={this.handleSubmit}
                        userId={cheapToString}
                        bookId={this.state.bookId}
                    />
                </div>
            </div>
        )
    }
}