import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core";
import {Rating, Skeleton} from "@material-ui/lab";
import React, {Component} from "react";
import {Book} from "../../model/Book";
import classes from './BookDisplay.module.css';
import {Stars} from "@material-ui/icons";
import photoUtils from "../../utils/photoUtils";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ConstsUtils, DateUtils } from "../../utils";


interface BookDisplayProps extends RouteComponentProps {
    book: Book
    crown?: boolean
    authors: string[],
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
        /*  id title genre language date photo stars */
        if (this.props.resultsVariant) {
            const { id, title, genre, language, date, photo, stars } = this.props.book;
            const authors = this.props.authors;
            const {loading, loadingAuthors} = this.props;

            if (loading) {
                return (
                    <Card>
                        <div className={classes.altCardContainer}>
                            <div>
                                <Skeleton variant='rect' className={classes.altMediaContainer}
                                    width={140} height={220}
                                />
                            </div>
                            <div className={classes.AltTextsContainer}>
                                <Skeleton variant='text' height={50} width={250}/>
                                <Skeleton variant='text' height={25} width={50}/>
                                <div className={classes.AltInfoSubitem}>
                                    <Skeleton variant='text' height={25} width={50}/>
                                    <Skeleton variant='text' height={25} width={150}/>
                                </div>
                                <div className={classes.AltInfoSubitem}>
                                    <Skeleton variant='text' height={25} width={50}/>
                                    <Skeleton variant='text' height={25} width={250}/>
                                </div>
                                <div className={classes.AltInfoSubitem}>
                                    <Skeleton variant='text' height={25} width={50}/>
                                    <Skeleton variant='text' height={25} width={200}/>
                                </div>
                                {/* <div className={classes.AltInfoSubitem}>
                                    <Skeleton variant='text' height={25} width={50}/>
                                    <Skeleton variant='text' height={150} width={300}/>
                                </div> */}
                            </div>    
                        </div>
                    </Card>
                );
            } else {
                return (
                    <Card>
                        <CardActionArea onClick={() => this.props.history.push('/books/' + id)}>
                            <div className={classes.altCardContainer}>
                                <div>
                                    <CardMedia className={classes.altMediaContainer} image={`data:image/jpeg;base64,${photo}`}/>
                                </div>
                                <div className={classes.AltTextsContainer}>
                                    <Typography className={classes.title} variant='h4'>{title}</Typography>
                                    <Typography>{authors.join(', ')}</Typography>
                                    <div className={classes.AltInfoSubitem}>
                                        <Typography>Género:</Typography>
                                        <Typography>{genre}</Typography>
                                    </div>
                                    <div className={classes.AltInfoSubitem}>
                                        <Typography>Idioma:</Typography>
                                        <Typography>{ConstsUtils.getLanguageValue(language)}</Typography>
                                    </div>
                                    <div className={classes.AltInfoSubitem}>
                                        <Typography>Fecha de publicación:</Typography>
                                        <Typography>{date ? DateUtils.formatDateTimeYears(date.toString()) : 'no date'}</Typography>
                                    </div>
                                    <div className={classes.AltInfoSubitem}>
                                        <Typography>Rating:</Typography>
                                        <Rating name="read-only" value={stars} precision={0.5} readOnly/>
                                    </div>
                                    {/* <div className={classes.infoSubitem}>
                                        <Typography>Sinópsis:</Typography>
                                        <Typography>(WIP) Sinópsis no existen aún!</Typography>
                                    </div> */}
                                </div>
                            </div>
                        </CardActionArea>
                    </Card>
                );
            }
        } else {
            return (
                <Card className={classes.root}>
                    <CardActionArea onClick={this.handleClick}>           
                        <div className={classes.cardContainer}>
                            <div className={classes.starsContainer}>
                                {stars}
                                <div className={classes.stars}>
                                    <Rating name="read-only" value={this.props.book.stars} readOnly />
                                </div>
                            </div>
                            <div className={classes.mediaContainer}>
                                <CardMedia className={classes.media} image={photo}/>
                            </div>
                            <div className={classes.textsContainer}>
                                <CardContent>
                                    <Typography className={classes.title} gutterBottom variant="h5">{this.props.book.title}</Typography>
                                    {this.props.loading ?
                                        <Skeleton variant='text' height={25} width={50}/>
                                        :
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {/* TODO add anonymous authors from props (no authors for book) */}
                                            {this.props.authors.join(', ')}
                                        </Typography>
                                    }
                                </CardContent>
                                {/* <CardMedia src={photo} title={this.props.book.title}/> */}
                            </div>
                        </div>
                    </CardActionArea>
                </Card>
            )
        }
    }
}


export default withRouter(BookDisplay);
