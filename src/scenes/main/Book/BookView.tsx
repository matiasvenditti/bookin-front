import React, {Component} from "react";
import {
    Avatar,
    Badge,
    Card,
    CardContent,
    CardMedia, Divider,
    Grid,
    Link, List,
    ListItem,
    ListItemText,
    Typography,
    Box
} from "@material-ui/core";
import {dummyAvatar} from "../../../assets";
import {Author} from "../../../model/Author";
import Rating from "@material-ui/lab/Rating";
import {formatDateTimeYears} from "../../../utils/formateDateTime";
import {getCode} from "country-list";
import Flag from "react-world-flags";

interface BookViewProps {
    data: {
        id: string,
        title: string,
        genre: string,
        date: string,
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
        date: string,
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
            authors: props.authors,
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
                        <Grid container item xs={5}>
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
                                                    style={{
                                                        marginBottom: 5,
                                                        fontWeight: "bold"
                                                    }}>{data.title} </Typography>
                                        <Typography align='left' variant='h5'>Genero: <Box display="inline-block"
                                                                                           fontWeight="fontWeightBold">{data.genre}</Box></Typography>
                                        <Typography align='left' variant='h5'>Idioma: <Box display="inline-block"
                                                                                           fontWeight="fontWeightBold">{data.language}</Box></Typography>
                                        <Typography align='left' variant='h5'>Fecha de publicacion: <Box
                                            display="inline-block"
                                            fontWeight="fontWeightBold">{formatDateTimeYears(data.date)}</Box></Typography>
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
                        <Grid container item xs={7}>
                            <Grid item xs={12}>
                                <div className='author-container'>
                                    <Typography align='left'
                                                variant='h4'
                                                style={{fontWeight: "bold", color: "darkgray"}}>Autores </Typography>
                                    <List style={{backgroundColor: '#f6f6f7', padding: 0, margin: '8px 0'}}>
                                        {authors.map((item, i) => ([

                                            <ListItem key={'author-view-item-' + i} button component={Link}
                                                      href={`/authors/${item.id}`}>
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
                                                    <Avatar
                                                        src={`data:image/jpeg;base64,${item.photo}` || dummyAvatar}/>

                                                </Badge>
                                                <ListItemText
                                                    primary={<Typography variant="h6"
                                                                         style={{color: 'black'}}>{item.firstName + ' ' + item.lastName + ' ' }<Flag code={getCode(item.nationality)}
                                                                                                                                               height="16"/></Typography>}
                                                    key={'text-' + i}
                                                />
                                            </ListItem>,
                                            (i !== authors.length - 1) && <Divider key={'divider-' + i}/>,
                                        ]))}
                                    </List>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className='reviews-container'>
                                    <Typography variant='h4' style={{
                                        fontWeight: "bold",
                                        color: "darkgray",
                                        marginTop: 10,
                                        marginBottom: 10
                                    }}>Rating
                                        en Promedio</Typography>
                                    <Rating name="read-only" value={data.stars} precision={0.5} readOnly/>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            )
        }
    }
}
