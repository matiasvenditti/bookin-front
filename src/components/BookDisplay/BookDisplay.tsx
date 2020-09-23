import { Box, Grid, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React, { Component } from "react";
import { Book } from "../../model";
import StarIcon from '@material-ui/icons/Star';
import './BookDisplay.css';

interface BookDisplayProps {
    book: Book
    crown: boolean
}

export default class BookDisplay extends Component<BookDisplayProps, any> {

    render() {
        const photo: string = `data:image/jpeg;base64,${this.props.book.photo}`;
        const crown = this.props.crown ?
                        <StarIcon/>:
                        null

        return(
            <div className='BookDisplay' >
                <Box component="fieldset" mb={3} borderColor="transparent"color='primary'>
                    <div className="ratingDisplay">
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            {crown}
                        </Grid>
                        <Grid item xs={4}>
                            <Rating name="read-only" value={this.props.book.rating} readOnly />
                        </Grid>

                    </Grid>
                    </div>
                    <img src={photo} width="100"/>
                    <div className='BookName'>{this.props.book.title}</div>
                </Box>

            </div>
        )
    }

}