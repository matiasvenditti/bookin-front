import { AxiosResponse } from "axios";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Book, NewReview, User } from "../../../model";
import { RequestStatus } from "../../../model/consts/RequestStatus";
import { Review } from "../../../model/Review";
import { UserService } from "../../../services";
import ReviewService from "../../../services/ReviewService";
import CreateReviewForm from "./CreateReviewForm";

interface CreateReviewState{
    user: User;
    bookId: string;
    reviewStatus: RequestStatus,
}

interface CreateReviewProps extends RouteComponentProps<MatchParams> {
    book: Book;
    handleSubmit(newReview: NewReview): void,
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
            reviewStatus: RequestStatus.NONE
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

    render() {
        return (
            <CreateReviewForm
                onSubmit={this.props.handleSubmit}
                user={this.state.user}
                book={this.props.book}
            />
        )
    }
}
export default withRouter(CreateReview);