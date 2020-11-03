import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import PrivateRoute from './PrivateRoute';
import Home from "../../scenes/home/Home/Home";
import Register from "../../scenes/session/Register/Register";
import Login from '../../scenes/session/Login/Login';
import Profile from '../../scenes/profile/Profile';
import Footer from "../Footer/Footer";
import { Snackbar } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import { RequestStatus } from "../../model/consts/RequestStatus";
import CreateAuthor from "../../scenes/authors/CreateAuthor/CreateAuthor";
import { UserRoles } from "../../model/consts/Roles";
import Author from "../../scenes/authors/Author/Author";
import ModifyAuthor from "../../scenes/authors/ModifyAuthor/ModifyAuthor";
import { Book, CreateBook } from "../../scenes/books";
import ResultsMenu from "../../scenes/results/ResultsMenu/ResultsMenu";
import { Header } from "..";
import ModifyBook from "../../scenes/books/ModifyBook/ModifyBook";
import { Book as BookModel, } from "../../model";
import { Author as AuthorModel, } from "../../model/Author";
import { AuthService } from "../../services";
import RecoverPassword from "../../scenes/session/RecoverPassword/RecoverPassword";


interface RouterProps {

}

interface RouterState {
    logoutStatus: boolean,
    getUserDataError: boolean,
    searchBooksError: boolean,
    searchAuthorsError: boolean,
    registerStatus: RequestStatus,
    loginStatus: RequestStatus,
    passwordRecoveryStatus: RequestStatus,
    sendPasswordRecoveryStatus: RequestStatus,
    loadAvatarError: boolean,
    editProfileStatus: RequestStatus,
    changePasswordStatus: RequestStatus,
    editAuthorStatus: RequestStatus,
    deleteProfileStatus: RequestStatus,
    createAuthorStatus: RequestStatus,
    createBookStatus: RequestStatus,
    updateAuthorStatus: RequestStatus,
    getAuthorDataError: boolean,
    getModifyAuthorDataError: boolean,
    deleteAuthorStatus: RequestStatus,
    getBookDataError: boolean,
    deleteBookStatus: RequestStatus,
    updateBookStatus: RequestStatus,
    getModifyBookDataError: boolean,
    redirectReload: boolean,
    reviewStatus: RequestStatus,
    deleteReviewStatus: RequestStatus,
    updateReviewStatus: RequestStatus,
    search: {
        data: {books: BookModel[], authors: AuthorModel[]}
        searchInput: string,
        updateStatus: RequestStatus,
        searchRequestError: boolean,
    },
    getBooksRankingByGenreError: boolean,
    getBooksRankingByScoreError: boolean,
}

class Router extends React.Component<any, RouterState> {
    constructor(props: RouterProps) {
        super(props);
        this.state = {
            logoutStatus: false,
            getUserDataError: false,
            searchBooksError: false,
            searchAuthorsError: false,
            registerStatus: RequestStatus.NONE,
            loginStatus: RequestStatus.NONE,
            passwordRecoveryStatus: RequestStatus.NONE,
            sendPasswordRecoveryStatus: RequestStatus.NONE,
            loadAvatarError: false,
            editProfileStatus: RequestStatus.NONE,
            changePasswordStatus: RequestStatus.NONE,
            editAuthorStatus: RequestStatus.NONE,
            deleteProfileStatus: RequestStatus.NONE,
            createAuthorStatus: RequestStatus.NONE,
            createBookStatus: RequestStatus.NONE,
            updateAuthorStatus: RequestStatus.NONE,
            getAuthorDataError: false,
            getModifyAuthorDataError: false,
            deleteAuthorStatus: RequestStatus.NONE,
            getBookDataError: false,
            deleteBookStatus: RequestStatus.NONE,
            updateBookStatus: RequestStatus.NONE,
            getModifyBookDataError: false,
            redirectReload: false,
            reviewStatus: RequestStatus.NONE,
            deleteReviewStatus: RequestStatus.NONE,
            updateReviewStatus: RequestStatus.NONE,
            search: {
                data: {books: [], authors: []},
                searchInput: '',
                updateStatus: RequestStatus.NONE,
                searchRequestError: false,
            },
            getBooksRankingByGenreError: false,
            getBooksRankingByScoreError: false,
        };
    }

    render() {
        const {search} = this.state;
        return (
            <BrowserRouter>
                <Header
                    nowIsLogged={this.state.loginStatus === RequestStatus.SUCCESS}
                    roles={[UserRoles.RoleAdmin]}
                    logoutCallback={() => this.setState({...this.state, logoutStatus: true })}  // only one to trigger re-render
                    getUserDataErrorCallback={() => this.setState({...this.state, getUserDataError: true})}
                    searchBooksErrorCallback={() => this.setState({...this.state, searchBooksError: true})}
                    searchAuthorsErrorCallback={() => this.setState({...this.state, searchAuthorsError: true})}
                    onSearch={(searchInput: string) => (
                            this.setState({...this.state, search: {...this.state.search, searchInput}})
                    )}
                    logged={AuthService.isLoggedIn()}
                />
                <Switch>
                    <Route exact path='/'>
                        <Home
                            getBooksRankingByGenreErrorCallback={() => this.setState({...this.state, getBooksRankingByGenreError: true})}
                            getBooksRankingByScoreErrorCallback={() => this.setState({...this.state, getBooksRankingByScoreError: true})}/>
                    </Route>
                    <Route path='/register' >
                        <Register registerCallback={(registerStatus: RequestStatus, loginStatus: RequestStatus) =>
                            this.setState({ ...this.state, registerStatus, loginStatus })}
                        />
                    </Route>
                    <Route path='/login' >
                        <Login
                            loginCallback={(loginStatus: RequestStatus) => this.setState({ ...this.state, loginStatus })}
                            passwordRecoveryCallback={(passwordRecoveryStatus: RequestStatus) => this.setState({...this.state, passwordRecoveryStatus})}
                        />
                    </Route>
                    <Route path='/recover'>
                        <RecoverPassword
                            sendPasswordRecoveryCallback={(sendPasswordRecoveryStatus: RequestStatus) => this.setState({...this.state, sendPasswordRecoveryStatus})}
                        />
                    </Route>
                    <PrivateRoute path='/profile' roles={[]} >
                        <Profile
                            deleteProfileCallback={(deleteProfileStatus: RequestStatus) => this.setState({ ...this.state, deleteProfileStatus })}
                            onLoadErrorCallback={() => this.setState({ ...this.state, loadAvatarError: true })}
                            editProfileCallback={(editProfileStatus: RequestStatus) => this.setState({ ...this.state, editProfileStatus })}
                            changePasswordCallback={(changePasswordStatus: RequestStatus) => this.setState({ ...this.state, changePasswordStatus})}
                        />
                    </PrivateRoute>

                    <PrivateRoute path='/authors/edit/:id' roles={[UserRoles.RoleAdmin]}>
                        <ModifyAuthor
                            updateCallback={(updateAuthorStatus: RequestStatus) => this.setState({ ...this.state, updateAuthorStatus })}
                            getAuthorDataErrorCallback={() => this.setState({ ...this.state, getModifyAuthorDataError: true })}
                            onLoadImageError={() => this.setState({...this.state, loadAvatarError: true})}
                        />
                    </PrivateRoute>

                    <Route path='/authors/:id' roles={[]} >
                        <Author
                            loadAvatarErrorCallback={() => this.setState({ ...this.state, loadAvatarError: true })}
                            getAuthorDataErrorCallback={() => this.setState({ ...this.state, getAuthorDataError: true })}
                            editAuthorCallback={(editAuthorStatus: RequestStatus) => this.setState({ ...this.state, editAuthorStatus })}
                            deleteAuthorCallback={(deleteAuthorStatus: RequestStatus) => this.setState({ ...this.state, deleteAuthorStatus })}
                        />
                    </Route>

                    <PrivateRoute path='/authors' roles={[UserRoles.RoleAdmin]}>
                        <CreateAuthor
                            createAuthorCallback={(createAuthorStatus: RequestStatus) => this.setState({ ...this.state, createAuthorStatus })}
                            onLoadImageError={() => this.setState({...this.state, loadAvatarError: true})}
                        />
                    </PrivateRoute>

                    <PrivateRoute path='/books/edit/:id' roles={[UserRoles.RoleAdmin]}>
                        <ModifyBook
                            updateCallback={(updateBookStatus: RequestStatus) => this.setState({ ...this.state, updateBookStatus })}
                            getBookDataErrorCallback={() => this.setState({ ...this.state, getModifyBookDataError: true })}
                            onLoadImageError={() => this.setState({...this.state, loadAvatarError: true})}
                        />
                    </PrivateRoute>

                    <Route path='/books/:id' roles={[]} >
                        <Book
                            getBookDataErrorCallback={() => this.setState({ ...this.state, getBookDataError: true })}
                            deleteBookCallback={(deleteBookStatus: RequestStatus) => this.setState({ ...this.state, deleteBookStatus })}
                            updateCallback={(reviewStatus: RequestStatus) => this.setState({ ...this.state, reviewStatus })}
                            deleteReviewCallback={(deleteReviewStatus: RequestStatus) => this.setState({...this.state, deleteReviewStatus})}
                            updateReviewCallback={(updateReviewStatus: RequestStatus) => this.setState({...this.state, updateReviewStatus})}
                        />
                    </Route>

                    <PrivateRoute path='/books' roles={[UserRoles.RoleAdmin]}>
                        <CreateBook
                            createBookCallback={(createBookStatus: RequestStatus) => this.setState({ ...this.state, createBookStatus })}
                            onLoadImageError={() => this.setState({...this.state, loadAvatarError: true})}
                        />
                    </PrivateRoute>

                    <ResultsMenu
                        searchInput={search.searchInput}
                        updateStatus={search.updateStatus}
                        searchRequestErrorCallback={() => this.setState({...this.state, search: {...this.state.search, searchRequestError: true}})}
                    />
                </Switch>
                <Footer />
                {this.renderToasts()}
            </BrowserRouter>
        );
    }

    renderToasts() {
        const {
            //
            getUserDataError, searchBooksError, searchAuthorsError,
            //
            registerStatus,
            // login
            loginStatus, passwordRecoveryStatus, sendPasswordRecoveryStatus,
            // profile
            editProfileStatus,
            deleteProfileStatus,
            loadAvatarError,
            // author
            createAuthorStatus,
            updateAuthorStatus,
            getAuthorDataError,
            getModifyAuthorDataError,
            deleteAuthorStatus,
            // books
            createBookStatus,
            getBookDataError,
            deleteBookStatus,
            updateBookStatus,
            getModifyBookDataError,
            // reviews
            reviewStatus,
            deleteReviewStatus,
            updateReviewStatus,
            // ranking in home
            getBooksRankingByGenreError,
            getBooksRankingByScoreError,
            // more password
            changePasswordStatus,
        } = this.state;

        return (
            <div>
                {this.renderAToast(getUserDataError,                                 'error', 'Hubo un error al obtener los datos del usuario, intente más tard', () => this.setState({...this.state, getUserDataError: false}))}
                {this.renderAToast(searchBooksError,                                 'error', 'Hubo un error al buscar libros, intente más tarde', () => this.setState({...this.state, searchBooksError: false}))}
                {this.renderAToast(searchAuthorsError,                               'error', 'Hubo un error al buscar autores, intente más tarde', () => this.setState({...this.state, searchAuthorsError: false}))}
                {this.renderAToast(registerStatus === RequestStatus.SUCCESS,        'success', 'Te has registrado correctamente!', () => this.setState({...this.state, registerStatus: RequestStatus.NONE}))}
                {this.renderAToast(registerStatus === RequestStatus.ERROR,          'error', 'Hubo un error al registrarse, intente más tarde', () => this.setState({...this.state, registerStatus: RequestStatus.NONE}))}

                {this.renderAToast(loginStatus === RequestStatus.ERROR,             'error', 'Hubo un error al ingresar, intente más tarde', () => this.setState({...this.state, loginStatus: RequestStatus.NONE}))}
                {this.renderAToast(passwordRecoveryStatus === RequestStatus.SUCCESS,'success', 'Se ha realizado el pedido de recuperación correctamente, en breve recibirá un correo', () => this.setState({...this.state, passwordRecoveryStatus: RequestStatus.NONE}))}
                {this.renderAToast(passwordRecoveryStatus === RequestStatus.ERROR,  'error', 'Hubo un error al hacer el pedido de recuperación, intente más tarde', () => this.setState({...this.state, passwordRecoveryStatus: RequestStatus.NONE}))}
                {this.renderAToast(sendPasswordRecoveryStatus === RequestStatus.SUCCESS,'success', 'Se ha cambiado su contraseña exitosamente', () => this.setState({...this.state, sendPasswordRecoveryStatus: RequestStatus.NONE}))}
                {this.renderAToast(sendPasswordRecoveryStatus === RequestStatus.ERROR,  'error', 'Hubo un error al cambiar su contraseña, intente más tarde', () => this.setState({...this.state, sendPasswordRecoveryStatus: RequestStatus.NONE}))}

                {this.renderAToast(editProfileStatus === RequestStatus.SUCCESS,     'success', 'Se han actualizado los datos del usuario correctamente', () => this.setState({...this.state, editProfileStatus: RequestStatus.NONE}))}
                {this.renderAToast(editProfileStatus === RequestStatus.ERROR,       'error', 'Hubo un error al actualizar los datos, intente más tarde', () => this.setState({...this.state, editProfileStatus: RequestStatus.NONE}))}
                {this.renderAToast(deleteProfileStatus === RequestStatus.SUCCESS,   'success', 'Se ha eliminado la cuenta correctamente', () => this.setState({...this.state, deleteProfileStatus: RequestStatus.NONE}))}
                {this.renderAToast(deleteProfileStatus === RequestStatus.ERROR,     'error', 'Hubo un error al eliminar al cuenta, intente más tarde', () => this.setState({...this.state, deleteProfileStatus: RequestStatus.NONE}))}
                {this.renderAToast(loadAvatarError,                                  'error', 'La imagen pesa mas de 100KB o tiene una resolución mayor a 480x480, seleccione una mas pequeña', () => this.setState({...this.state, loadAvatarError: false}))}
                {this.renderAToast(createAuthorStatus === RequestStatus.SUCCESS,    'success', 'Se ha creado el autor exitosamente', () => this.setState({...this.state, createAuthorStatus: RequestStatus.NONE}))}
                {this.renderAToast(createAuthorStatus === RequestStatus.ERROR,      'error', 'Hubo un error al crear el autor, intente más tarde', () => this.setState({...this.state, createAuthorStatus: RequestStatus.NONE}))}
                {this.renderAToast(updateAuthorStatus === RequestStatus.SUCCESS,    'success', 'Se ha modificado el autor exitosamente', () => this.setState({...this.state, updateAuthorStatus: RequestStatus.NONE}))}
                {this.renderAToast(updateAuthorStatus === RequestStatus.ERROR,      'error', 'Hubo un error al modificar el autor, intente más tarde', () => this.setState({...this.state, updateAuthorStatus: RequestStatus.NONE}))}
                {this.renderAToast(getAuthorDataError,                               'error', 'Hubo un error al obtener los datos del autor, intente más tarde', () => this.setState({...this.state, getAuthorDataError: false}))}
                {this.renderAToast(getModifyAuthorDataError,                         'error', 'Hubo un error al obtener los datos del autor, intente más tarde', () => this.setState({...this.state, getModifyAuthorDataError}))}
                {this.renderAToast(deleteAuthorStatus === RequestStatus.SUCCESS,    'success', 'Se ha eliminado el autor exitosamente', () => this.setState({...this.state, deleteAuthorStatus: RequestStatus.NONE}))}
                {this.renderAToast(deleteAuthorStatus === RequestStatus.ERROR,      'error', 'Hubo un error al eliminar el autor, intente más tarde', () => this.setState({...this.state, deleteAuthorStatus: RequestStatus.NONE}))}
                {this.renderAToast(createBookStatus === RequestStatus.SUCCESS,      'success', 'Se ha creado el libro exitosamente', () => this.setState({...this.state, createBookStatus: RequestStatus.NONE}))}
                {this.renderAToast(createBookStatus === RequestStatus.ERROR,        'error', 'Hubo un error al crear el libro, intente más tarde', () => this.setState({...this.state, createBookStatus: RequestStatus.NONE}))}
                {this.renderAToast(getBookDataError,                                 'error', 'Hubo un error al obtener los datos del libro, intente más tarde', () => this.setState({...this.state, getBookDataError: false}))}
                {this.renderAToast(deleteBookStatus === RequestStatus.SUCCESS,      'success', 'Se ha eliminado el libro exitosamente', () => this.setState({...this.state, deleteBookStatus: RequestStatus.NONE}))}
                {this.renderAToast(deleteBookStatus === RequestStatus.ERROR,        'error', 'Hubo un error al eliminar el libro, intente más tarde', () => this.setState({...this.state, deleteBookStatus: RequestStatus.NONE}))}
                {this.renderAToast(updateBookStatus === RequestStatus.SUCCESS,      'success', 'Se actualizaron los datos del libro exitosamente', () => this.setState({...this.state, updateBookStatus: RequestStatus.NONE}))}
                {this.renderAToast(updateBookStatus === RequestStatus.ERROR,        'error', 'Hubo un error al actualizar los datos del libro, intente más tarde', () => this.setState({...this.state, updateBookStatus: RequestStatus.NONE}))}
                {this.renderAToast(getModifyBookDataError,                           'error', '', () => this.setState({...this.state, getModifyBookDataError: false}))}
                {this.renderAToast(reviewStatus  === RequestStatus.SUCCESS,      'success', 'Se ha creado la reseña exitosamente', () => this.setState({...this.state, reviewStatus: RequestStatus.NONE}))}
                {this.renderAToast(reviewStatus  === RequestStatus.ERROR,      'error', 'Hubo un error al crear la reseña', () => this.setState({...this.state, reviewStatus: RequestStatus.NONE}))}
                {this.renderAToast(deleteReviewStatus  === RequestStatus.SUCCESS,      'success', 'Se ha eliminado la reseña exitosamente', () => this.setState({...this.state, deleteReviewStatus: RequestStatus.NONE}))}
                {this.renderAToast(deleteReviewStatus  === RequestStatus.ERROR,      'error', 'Hubo un error al eliminar la reseña', () => this.setState({...this.state, deleteReviewStatus: RequestStatus.NONE}))}
                {this.renderAToast(updateReviewStatus  === RequestStatus.SUCCESS,      'success', 'Se ha modificado la reseña exitosamente', () => this.setState({...this.state, updateReviewStatus: RequestStatus.NONE}))}
                {this.renderAToast(updateReviewStatus  === RequestStatus.ERROR,      'error', 'Hubo un error al modificar la reseña', () => this.setState({...this.state, updateReviewStatus: RequestStatus.NONE}))}
                {this.renderAToast(getBooksRankingByGenreError,                     'error', 'Hubo un error al obtener la lista de libros', () => this.setState({...this.state, getBooksRankingByGenreError: false}))}
                {this.renderAToast(changePasswordStatus  === RequestStatus.SUCCESS,      'success', 'Se cambió la contraseña exitosamente', () => this.setState({...this.state, changePasswordStatus: RequestStatus.NONE}))}
                {this.renderAToast(changePasswordStatus  === RequestStatus.ERROR,      'error', 'La contraseña ingresada no coincide con la de este usuario', () => this.setState({...this.state, changePasswordStatus: RequestStatus.NONE}))}
            </div>
        );
    }

    renderAToast = (open: boolean, severity: 'success' | 'error', text: string, onClose: any) => {
        return (
            <Snackbar open={open} autoHideDuration={2000} onClose={onClose} >
                <Alert severity={severity}>{text}</Alert>
            </Snackbar>
        )
    };
}


export default Router;
