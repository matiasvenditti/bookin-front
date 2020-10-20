import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core";
import {Rating, Skeleton} from "@material-ui/lab";
import React, {Component} from "react";
import {Book} from "../../model/Book";
import classes from './BookDisplay.module.css';
import {Stars} from "@material-ui/icons";
import photoUtils from "../../utils/photoUtils";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { DateUtils } from "../../utils";


interface BookDisplayProps extends RouteComponentProps {
    book: Book
    crown?: boolean
    author: string,
    resultsVariant?: boolean,
    loading?: boolean,
    loadingAuthors?: boolean,
}

class BookDisplay extends Component<BookDisplayProps, any> {

    handleClick = () => {
        this.props.history.push(`/books/${this.props.book.id}`);    
    }

    render() {
        const photo: string = photoUtils.getPhotoFromBytearray(this.props.book.photo)
        const stars = this.props.crown ? <Stars color={"primary"}/>: null;
        /* 
            id
            title
            genre
            language
            date
            photo
            stars 
        */
        if (this.props.resultsVariant) {
            const {
                id,
                title,
                genre,
                language,
                date,
                photo,
                // stars,
            } = this.props.book;
            const author = this.props.author;
            const {loading, loadingAuthors} = this.props;

            if (loading) {
                return (
                    <Card className={classes.resultsVariantCard}>
                        <div className={classes.resultsVariantCardContainer}>
                            <Skeleton variant='rect' className={classes.media}/>
                            <div className={classes.info}>
                                <Skeleton variant='text' height={50} width={75}/>
                                <Skeleton variant='text' height={25} width={50}/>
                                <div className={classes.infoSubitem}>
                                    <Skeleton variant='text' height={25} width={50}/>
                                    <Skeleton variant='text' height={25} width={150}/>
                                </div>
                                <div className={classes.infoSubitem}>
                                    <Skeleton variant='text' height={25} width={50}/>
                                    <Skeleton variant='text' height={25} width={250}/>
                                </div>
                                <div className={classes.infoSubitem}>
                                    <Skeleton variant='text' height={25} width={50}/>
                                    <Skeleton variant='text' height={25} width={200}/>
                                </div>
                                <div className={classes.infoSubitem}>
                                    <Skeleton variant='text' height={25} width={50}/>
                                    <Skeleton variant='text' height={150} width={300}/>
                                </div>
                            </div>    
                        </div>
                    </Card>
                );
            } else {
                return (
                    <Card className={classes.resultsVariantCard}>
                        <CardActionArea onClick={() => this.props.history.push('/books/' + id)}>
                            <div className={classes.resultsVariantCardContainer}>
                                <CardMedia
                                    className={classes.media}
                                    image={`data:image/jpeg;base64,${photo}`}
                                />
                                <div className={classes.info}>
                                    <Typography variant='h4'>{title}</Typography>
                                    {loadingAuthors ? <Skeleton variant='text' height={25}/> : <Typography>{author}</Typography>}
                                    <div className={classes.infoSubitem}>
                                        <Typography>Género:</Typography>
                                        <Typography>{genre}</Typography>
                                    </div>
                                    <div className={classes.infoSubitem}>
                                        <Typography>Idioma:</Typography>
                                        <Typography>{language}</Typography>
                                    </div>
                                    <div className={classes.infoSubitem}>
                                        <Typography>Fecha de publicación:</Typography>
                                        <Typography>{date ? DateUtils.formatDateTimeYears(date.toString()) : 'no date'}</Typography>
                                    </div>
                                    <div className={classes.infoSubitem}>
                                        <Typography>Sinópsis:</Typography>
                                        <Typography>(WIP) Sinópsis no existen aún!</Typography>
                                    </div>
                                </div>
                            </div>
                        </CardActionArea>
                    </Card>
                );
            }
        } else {
            return (
                <Card className={classes.fullHeight}>                
                    <div className={classes.flex}>
                        {stars}
                        <div className={classes.stars}>
                            <Rating name="read-only" value={this.props.book.stars} readOnly />
                        </div>
                    </div>
                    <CardActionArea onClick={this.handleClick}>
                        <CardMedia className={classes.media} image={photo}/>
                        <CardContent>
                            <Typography gutterBottom variant="h5">{this.props.book.title}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {/* TODO add anonymous author from props (no author for book) */}
                                {this.props.author}
                            </Typography>
                        </CardContent>
                        <CardMedia src={photo} title={this.props.book.title}/>
                    </CardActionArea>
                </Card>
            )
        }
    }
}


export default withRouter(BookDisplay);
