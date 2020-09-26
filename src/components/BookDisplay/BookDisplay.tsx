import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import React, {Component} from "react";
import {Book} from "../../model/Book";
import classes from './BookDisplay.module.css';
import {Stars} from "@material-ui/icons";
import photoUtils from "../../utils/photoUtils";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface BookDisplayProps extends RouteComponentProps {
    book: Book
    crown: boolean
    author: string
}
class BookDisplay extends Component<BookDisplayProps, any> {
    render() {
        const photo: string = photoUtils.getPhotoFromBytearray(this.props.book.photo)
        const stars = this.props.crown ? <Stars color={"primary"}/>: null
        return(
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
                               {this.props.author}
                            </Typography>
                        </CardContent>
                        <CardMedia src={photo} title={this.props.book.title}/>
                    </CardActionArea>
                </Card>
        )
    }
    handleClick = () => {
        this.props.history.push(`/books/${this.props.book.id}`);    
    }
}
export default withRouter(BookDisplay);