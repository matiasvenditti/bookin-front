import React from "react";
import AppBar from '@material-ui/core/AppBar';
import { fade, Theme, Toolbar, IconButton, Menu, MenuItem, Typography, withStyles } from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';
import "./Header.css";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withRouter } from "react-router-dom";
import { AuthorsService, AuthService, BooksService, SessionService, UserService } from "../../services";
import SearchSelect from "./SearchSelect/SearchSelect";
import { RequestStatus } from "../../model/consts/RequestStatus";


interface HeaderProps {
    nowIsLogged: boolean,
    roles: string[],
    logoutCallback(): void,
    getUserDataErrorCallback(): void,
    searchBooksErrorCallback(): void,
    searchAuthorsErrorCallback(): void,
    redirectToBookAuthorCallback(query: string): void,
    onSearch(value: string): void,
}

interface HeaderState {
    firstName: string,
    anchorEl: Element | null,
    getUserDataStatus: RequestStatus,
    searchInput: string,
    userIsTyping: boolean,
    typingTimeout: any,
    books: any[],
    searchBooksStatus: RequestStatus,
    authors: any[],
    searchAuthorsStatus: RequestStatus,
}

class Header extends React.Component<any, HeaderState>{
    constructor(props: any) {
        super(props);
        this.state = {
            firstName: '',
            anchorEl: null,
            getUserDataStatus: RequestStatus.NONE,
            searchInput: '',
            userIsTyping: false,
            typingTimeout: 0,
            books: [],
            searchBooksStatus: RequestStatus.NONE,
            authors: [],
            searchAuthorsStatus: RequestStatus.NONE,
        };

        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.setAnchorEl = this.setAnchorEl.bind(this);
    }

    // on reload the page
    componentDidMount() {
        this.setState({...this.state, getUserDataStatus: RequestStatus.LOADING});
        if (AuthService.isLoggedIn())
            UserService.getUserData()
                .then((response) => {
                    this.setState({ ...this.state, firstName: response.data.firstName, getUserDataStatus: RequestStatus.SUCCESS })
                })
                .catch((error) => {
                    this.setState({ ...this.state, getUserDataStatus: RequestStatus.ERROR })
                    this.props.getUserDataErrorCallback();
                    console.log(error);
                });
    }

    // on not logged to logged
    componentDidUpdate(prevProps: any) {
        if (!prevProps.nowIsLogged && this.props.nowIsLogged && AuthService.isLoggedIn()) {
            UserService.getUserData()
                .then((response) => this.setState({ ...this.state, firstName: response.data.firstName }))
                .catch((error) => console.log(error));
        }
    }

    handleMenu(event: React.MouseEvent<HTMLElement>) { this.setAnchorEl(event.currentTarget); }
    handleClose() { this.setAnchorEl(null); }
    setAnchorEl(anchorEl: Element | null) {
        this.setState((prevState: HeaderState) => ({
            ...prevState,
            anchorEl: anchorEl
        }))
    }

    handleLogout = () => {
        SessionService.logout();
        this.props.history.push('/login');
        this.props.logoutCallback();
        this.handleClose();
    }

    handleHomeRedirect = () => {
        this.props.history.push('/');
    }

    _searchRequest = (value: string) => {
        if (value === '') {
            // !! probablemente no sea correcto el feedback que se tiene
            // porque aparenta ser una request nueva cuando no lo es?
            this.setState({...this.state, books: [], authors: []});
            return;
        }
        this.setState({...this.state, searchBooksStatus: RequestStatus.LOADING, searchAuthorsStatus: RequestStatus.LOADING});
        const results = Promise.all([
            BooksService.searchBooks(value),
            AuthorsService.searchAuthors(value),
        ])
        results
            .then((response) => {
                this.setState({
                    ...this.state,
                    searchBooksStatus: RequestStatus.SUCCESS,
                    searchAuthorsStatus: RequestStatus.SUCCESS,
                    books: response[0].data,
                    authors: response[1].data,
                });
            })
            .catch((error: any) => {
                this.setState({...this.state, searchBooksStatus: RequestStatus.ERROR, searchAuthorsStatus: RequestStatus.ERROR});
                this.props.searchBooksErrorCallback();
                this.props.searchAuthorsErrorCallback();
            });
    }

    handleSearchChange = (value: string) => {
        if (this.state.typingTimeout) clearTimeout(this.state.typingTimeout);
        this.setState({
            ...this.state,
            userIsTyping: false,
            searchInput: value,
            typingTimeout: setTimeout(() => {
                this._searchRequest(value);
            }, 200),
        })
    }

    handleEnter = (value: string) => {
        this.setState({...this.state, searchInput: ''});
        this.props.onSearch(value);
    }

    render() {
        const { classes } = this.props;
        const searchInputLoading = (this.state.searchAuthorsStatus === RequestStatus.LOADING
            || this.state.searchBooksStatus === RequestStatus.LOADING
        );
        const loading = (this.state.searchBooksStatus === RequestStatus.LOADING || this.state.searchAuthorsStatus === RequestStatus.LOADING);
        const error = (this.state.searchBooksStatus === RequestStatus.ERROR || this.state.searchAuthorsStatus === RequestStatus.ERROR);

        return (
            <div>
                <AppBar position='static' color='primary' className={classes.title}>
                    <Toolbar>
                        <div className={'right grow title'}>
                            <Typography onClick={this.handleHomeRedirect} variant='h6'>Book in</Typography>
                        </div>
                        <div className={classes.search}>
                            <SearchSelect
                                inputValue={this.state.searchInput}
                                placeholder='Busca un autor un libro!'
                                id='header-search-select'
                                loadingOptions={false}
                                loading={loading}
                                options={!searchInputLoading ?
                                    this.state.books.map((book: any) => ({value: book, type: 'Libros'}))
                                        .concat(this.state.authors.map((author: any) => ({value: author, type: 'Autores'}))) 
                                    : []
                                }
                                onQueryChange={(value: any) => this.handleSearchChange(value)}
                                onEnter={(value: string) => this.handleEnter(value)}
                            />
                        </div>
                        <div className="grow" />
                        {this.renderButtons()}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

    renderButtons() {
        const logged = AuthService.isLoggedIn();
        const authorized = AuthService.isAuthorized(this.props.roles);
        if (logged) {
            return (
                <div>
                    <div className="center">
                        <Typography className='navbar-firstname'>{'¡Hola ' + this.state.firstName + '!'}</Typography>
                        <IconButton onClick={this.handleMenu}>
                            <AccountCircle fontSize='large' />
                        </IconButton>
                    </div>
                    <Menu
                        id="menu-appbar"
                        anchorEl={this.state.anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                        transformOrigin={{vertical: 'top', horizontal: 'right'}}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                    >
                        <MenuItem onClick={() => { this.props.history.push('/profile'); this.handleClose() }}>Ver Perfil</MenuItem>
                        {/* TODO: Uncomment when reviews are implemented */ }
                        {/*<MenuItem onClick={() => { this.props.history.push('/'); this.handleClose() }}>Ver Reseñas</MenuItem>*/}                        
                        {authorized ?
                            <div>
                                <MenuItem onClick={() => { this.props.history.push('/books'); this.handleClose() }}>Crear Libro</MenuItem>
                                <MenuItem onClick={() => { this.props.history.push('/authors'); this.handleClose() }}>Crear Autor</MenuItem>                            
                            </div>
                            :
                            null
                        }
                        <MenuItem onClick={this.handleLogout}>Cerrar Sesión</MenuItem>
                    </Menu>
                </div>
            )
        } else {
            return (
                <div>
                    <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group" >
                        <Button onClick={() => this.props.history.push('/login')}>Iniciar Sesión</Button>
                        <Button onClick={() => this.props.history.push('/register')}>Registrarte</Button>
                    </ButtonGroup>
                </div>
            );
        }
    }
}

const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
});

// @ts-ignore
export default withStyles(styles)(withRouter(Header));
