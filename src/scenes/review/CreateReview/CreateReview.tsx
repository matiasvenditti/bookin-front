import { Typography } from "@material-ui/core";
import { AxiosResponse } from "axios";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Book, NewReview, User } from "../../../model";
import { Review } from "../../../model/Review";
import { UserService } from "../../../services";
import ReviewService from "../../../services/ReviewService";
import CreateReviewForm from "./CreateReviewForm";

interface CreateReviewState{
    user: User;
    bookId: string;
}

interface CreateReviewProps extends RouteComponentProps<MatchParams> {
    book: Book;
}

interface MatchParams {
    id: string,
}

class CreateReview extends React.Component<CreateReviewProps, CreateReviewState>{

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
            bookId: this.props.match.params.id,
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

    handleSubmit = (values: NewReview) => {
        ReviewService.createReview(values)
        .then((response: AxiosResponse<Review>) => {
            this.props.history.push('/books/' + this.state.bookId);
        })
        .catch((error: any) => {
        });
    }

    render() {
        // const id = this.state.user.id;
        // const cheapToString = '' + id;
        return (
            <div>
                <div>
                    <Typography align='left' >Escribí una riseña</Typography>
                    <CreateReviewForm
                        onSubmit={this.handleSubmit}
                        user={this.state.user}
                        book={this.props.book}
                    />
                </div>
            </div>
        )
    }
}
export default withRouter(CreateReview);