import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import React, {Component} from "react";
import {Book} from "../../model";
import classes from './BookDisplay.module.css';
import {Stars} from "@material-ui/icons";
interface BookDisplayProps {
    book: Book
    crown: boolean
}
export default class BookDisplay extends Component<BookDisplayProps, any> {
    render() {
        const photo: string = `data:image/jpeg;base64,${this.props.book.photo}`;
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
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardMedia src={photo} title={this.props.book.title}/>
                    </CardActionArea>
                </Card>
        )
    }
    handleClick = () => {
        console.log("redirect");
    }
}