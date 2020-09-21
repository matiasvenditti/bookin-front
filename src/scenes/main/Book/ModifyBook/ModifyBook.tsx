import React, {Component} from "react";
import {getBookAuthors, getBookData, updateBook} from "../../../../services/BookService";
import {AxiosResponse} from "axios";
import {Book} from "../../../../model/Book";
import {Author} from "../../../../model/Author";
import {UpdateBook} from "../../../../model";
import {RequestStatus} from "../../../../model/consts/RequestStatus";
import {RouteComponentProps, withRouter} from "react-router-dom";
import ModifyBookForm from "./ModifyBookForm";
import {Typography} from "@material-ui/core";
import Loader from "../../../../components/Loader/Loader";
import "./ModifyBook.css"
import {getAuthors} from "../../../../services/AuthorService";

interface ModifyBookState {
    id: string,
    authors: Author[],
    allAuthors: Author[],
    book: {
        id: string,
        title: string,
        genre: string,
        date: string,
        photo: string,
        language: string,
        stars: number,
    },
    updateBookStatus: RequestStatus,
    getBookDataStatus: RequestStatus,
}

interface ModifyBookProps extends RouteComponentProps<MatchParams> {
    updateCallback(r: RequestStatus): void,

    getBookDataErrorCallback(): void,
}

interface MatchParams {
    id: string,
}

class ModifyBook extends Component<ModifyBookProps, ModifyBookState> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            authors: [],
            allAuthors: [],
            book: {
                id: "",
                title: '',
                genre: '',
                date: '',
                photo: "",
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
        const result: Promise<any> = Promise.all([getBookData({id: this.state.id}), getBookAuthors({id: this.state.id}), getAuthors()]);
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
        updateBook(values, photo)
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
                <div className='form-container'>
                    <Typography align='center' variant='h5'>Modificacion de libro</Typography>
                    <ModifyBookForm
                        onSubmit={this.handleSubmit}
                        authors={this.state.authors}
                        allAuthors={this.state.allAuthors}
                        book={this.state.book}
                        onCancel={this.props.history.goBack}
                        loading={this.state.getBookDataStatus === RequestStatus.LOADING}/>
                </div>
            </div>
        )
    }
}

export default withRouter(ModifyBook);