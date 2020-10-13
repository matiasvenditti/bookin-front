import { Typography } from "@material-ui/core";
import { TheatersOutlined } from "@material-ui/icons";
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
    updateCallback(r: RequestStatus): void,
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

    handleSubmit = (values: NewReview) => {
        ReviewService.createReview(values)
        .then((response: AxiosResponse<Review>) => {
            this.props.updateCallback(RequestStatus.SUCCESS);
            this.setState({ ...this.state, reviewStatus: RequestStatus.SUCCESS });
            //this.props.history.push('/books/' + this.state.bookId);
        })
        .catch((error: any) => {
            this.props.updateCallback(RequestStatus.ERROR);
            this.setState({ ...this.state, reviewStatus: RequestStatus.ERROR });
        });
    }

    render() {
        const id = this.state.user.id;
        const cheapToString = '' + id
        return (
            <div>
                <div>
                    <Typography align='left' >Escribí una reseña</Typography>
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