import React, {Component} from "react";
import {
    Avatar,
    Badge, Box,
    Card,
    CardContent,
    CardMedia, Divider,
    Grid,
    Link, List,
    ListItem,
    ListItemText,
    Typography
} from "@material-ui/core";
import {dummyAvatar} from "../../../assets";
import {Author} from "../../../model/Author";
import {baseURL} from "../../../services/EnvironmentService";
import Rating from "@material-ui/lab/Rating";

interface BookViewProps {
    data: {
        id: string,
        title: string,
        genre: string,
        date: Date,
        photo: string,
        language: string,
        stars: number,
    },
    authors: Author[],
    error: boolean,
}

interface BookViewState {

    data: {
        id: string,
        title: string,
        genre: string,
        date: Date,
        photo: string,
        language: string,
        stars: number,

    },
    authors: Author[],
}

export default class BookView extends Component<BookViewProps, BookViewState> {
    constructor(props: BookViewProps) {
        super(props);
        this.state = {
            data: {
                id: props.data.id,
                title: props.data.title,
                genre: props.data.genre,
                date: props.data.date,
                photo: props.data.photo,
                stars: props.data.stars,
                language: props.data.language,
            },
            authors: this.props.authors,
        }
    }


    render() {
        const {data, authors} = this.state;
        const {error} = this.props;

        if (error) {
            return (
                <div>
                    <Typography align='center' color='error' variant='h6'>Hubo un error al obtener los datos del
                        Libro</Typography>
                </div>
            )
        } else {
            return (
                <div>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid container item xs={12} sm={3} spacing={1}>
                            <div className='book-container'>
                                <Card
                                    style={
                                        {
                                            maxWidth: 345,
                                            border: "none",
                                            boxShadow: "none",
                                        }
                                    }
                                >
                                    <CardContent>
                                        <Typography align='left' variant='h3'
                                                    style={{marginBottom: 5}}>{data.title} </Typography>
                                        <Typography align='left' variant='h5'>{'Género: ' + data.genre} </Typography>
                                        <Typography align='left' variant='h5'>{'Idioma: ' + data.language} </Typography>
                                        <Typography align='left'
                                                    variant='h5'>{'Fecha de publicacion: ' + data.date.getFullYear()} </Typography>
                                    </CardContent>

                                    <CardMedia
                                        title={data.title}
                                        image={`data:image/jpeg;base64,${data.photo}`}
                                        style={
                                            {
                                                height: 100,
                                                paddingTop: '100%', // 16:9
                                                boxShadow: '',

                                            }
                                        }
                                    />

                                </Card>

                            </div>
                        </Grid>
                        <Grid container item xs={12} sm={6} spacing={2}>
                            <div className='author-container'>
                                <Typography align='left'
                                            variant='h5'>Autores </Typography>
                                <List>
                                    {authors.map((item, i) => ([

                                        <ListItem key={'profile-view-item-' + i} button component={Link} href={`/authors/${item.id}`}>
                                            <Badge
                                                color='primary'
                                                overlap='circle'
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                style={{
                                                    marginRight: 15,
                                                }}
                                                className={'avatar-image'}
                                            >
                                                <Avatar src={`data:image/jpeg;base64,${item.photo}` || dummyAvatar}/>

                                            </Badge>
                                            <ListItemText
                                                primary={<Typography variant="h4" style={{ color: 'black' }}>{item.firstName + ' ' + item.lastName}</Typography>}
                                                key={'text-' + i}
                                            />
                                        </ListItem>,
                                        (i !== authors.length - 1) && <Divider key={'divider-' + i} />,
                                    ]))}
                                </List>

                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Typography component="legend">Rating en Promedio</Typography>
                                    <Rating name="read-only" value={data.stars} precision={0.5} readOnly />
                                </Box>

                            </div>
                        </Grid>
                    </Grid>
                </div>
            )
        }
    }
}
