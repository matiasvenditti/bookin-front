import React, {Component} from "react";
import {AxiosResponse} from "axios";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Typography} from "@material-ui/core";
import classes from "./ModifyBook.module.css";
import { Author } from "../../../model/Author";
import { RequestStatus } from "../../../model/consts/RequestStatus";
import { AuthorsService, BooksService } from "../../../services";
import ModifyBookForm from "./ModifyBookForm";
import { UpdateBook } from "../../../model/UpdateBook";
import { Book } from "../../../model";
import { Loader } from "../../../components";


interface ModifyBookState {
    authors: Author[],
    allAuthors: Author[],
    book: Book,
    updateBookStatus: RequestStatus,
    getBookDataStatus: RequestStatus,
}

interface ModifyBookProps extends RouteComponentProps<MatchParams> {
    updateCallback(r: RequestStatus): void,
    getBookDataErrorCallback(): void,
    onLoadImageError(): void,
}

interface MatchParams {
    id: string,
}

class ModifyBook extends Component<ModifyBookProps, ModifyBookState> {
    constructor(props: any) {
        super(props);
        this.state = {
            authors: [],
            allAuthors: [],
            book: {
                id: parseInt(this.props.match.params.id),
                title: '',
                genre: '',
                date: new Date(),
                photo: '',
                language: '',
                stars: 0,
            },
            getBookDataStatus: RequestStatus.NONE,
            updateBookStatus: RequestStatus.NONE
        }
    }

    componentDidMount() {
        this.setState({getBookDataStatus: RequestStatus.LOADING});
        this.getData();
    }

    getData = () => {
        const result: Promise<any> = Promise.all([
            BooksService.getBookData(this.state.book.id),
            BooksService.getBookAuthors(this.state.book.id),
            AuthorsService.getAuthors()
        ]);
        
        result
            .then((response) => {
                this.setState({
                    book: response[0].data,
                    authors: response[1].data,
                    allAuthors: response[2].data,
                    getBookDataStatus: RequestStatus.SUCCESS
                })
            })
            .catch(() => {
                    this.setState({getBookDataStatus: RequestStatus.ERROR})
                    this.props.getBookDataErrorCallback();
                }
            );
    };

    handleSubmit = (values: UpdateBook, photo: File) => {
        BooksService.updateBook(values, photo)
            .then((response: AxiosResponse<Book>) => {
                this.setState({...this.state, updateBookStatus: RequestStatus.SUCCESS});
                this.props.updateCallback(RequestStatus.SUCCESS)
                this.props.history.push('/books/' + response.data.id)
            })
            .catch(() => {
                this.setState({...this.state, updateBookStatus: RequestStatus.ERROR});
                this.props.updateCallback(RequestStatus.ERROR)
            })
    }


    render() {
        const getBookDataStatus = this.state.getBookDataStatus;
        if (getBookDataStatus === RequestStatus.LOADING) {
            return (
                <div>
                    <Typography align='center' variant='subtitle1'> <Loader/> </Typography>
                </div>
            );
        }
        
        return (
            <div className='route-container'>
                <div className={classes.formContainer}>
                    <Typography align='center' variant='h5'>Modificacion de libro</Typography>
                    <ModifyBookForm
                        onSubmit={this.handleSubmit}
                        authors={this.state.authors}
                        allAuthors={this.state.allAuthors}
                        book={this.state.book}
                        onCancel={this.props.history.goBack}
                        loading={this.state.getBookDataStatus === RequestStatus.LOADING}
                        onLoadImageError={this.props.onLoadImageError}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(ModifyBook);