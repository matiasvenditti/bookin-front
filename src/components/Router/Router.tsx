import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import PrivateRoute from './PrivateRoute';
import Home from "../../scenes/home/Home";
import Register from "../../scenes/session/Register/Register";
import Login from '../../scenes/session/Login/Login';
import Profile from '../../scenes/profile/Profile';
import Menu from "../Menu/Menu";
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


interface RouterProps {

}

interface RouterState {
    reload: boolean,
    registerStatus: RequestStatus,
    loginStatus: RequestStatus,
    loadAvatarError: boolean,
    editProfileStatus: RequestStatus,
    editAuthorStatus: RequestStatus,
    deleteProfileStatus: RequestStatus,
    createAuthorStatus: RequestStatus,
    createBookStatus: RequestStatus,
    updateAuthorStatus: RequestStatus,
    getAuthorDataError: boolean,
    getModifyAuthorDataError: boolean,
    deleteAuthorStatus: RequestStatus,
}

class Router extends React.Component<RouterProps, RouterState> {
    constructor(props: RouterProps) {
        super(props);
        this.state = {
            reload: false,
            registerStatus: RequestStatus.NONE,
            loginStatus: RequestStatus.NONE,
            loadAvatarError: false,
            editProfileStatus: RequestStatus.NONE,
            editAuthorStatus: RequestStatus.NONE,
            deleteProfileStatus: RequestStatus.NONE,
            createAuthorStatus: RequestStatus.NONE,
            createBookStatus: RequestStatus.NONE,
            updateAuthorStatus: RequestStatus.NONE,
            getAuthorDataError: false,
            getModifyAuthorDataError: false,
            deleteAuthorStatus: RequestStatus.NONE,
        };
    }

    render() {
        return (
            <BrowserRouter>
                <Menu logoutCallback={() => this.setState({ reload: true })} nowIsLogged={this.state.loginStatus === RequestStatus.SUCCESS} roles={[UserRoles.RoleAdmin]}/>
                <Switch>
                    <Route exact path='/'><Home /></Route>
                    <Route path='/register' >
                        <Register registerCallback={(registerStatus: RequestStatus, loginStatus: RequestStatus) =>
                            this.setState({ ...this.state, registerStatus, loginStatus })}
                        />
                    </Route>
                    <Route path='/login' >
                        <Login loginCallback={(loginStatus: RequestStatus) => this.setState({ ...this.state, loginStatus })} />
                    </Route>
                    <PrivateRoute path='/profile' roles={[]} >
                        <Profile
                            deleteProfileCallback={(deleteProfileStatus: RequestStatus) => this.setState({ ...this.state, deleteProfileStatus })}
                            onLoadErrorCallback={() => this.setState({ ...this.state, loadAvatarError: true })}
                            editProfileCallback={(editProfileStatus: RequestStatus) => this.setState({ ...this.state, editProfileStatus })}
                        />
                    </PrivateRoute>

                    <PrivateRoute path='/authors/edit/:id' roles={[UserRoles.RoleAdmin]}>
                        <ModifyAuthor
                            updateCallback={(updateAuthorStatus: RequestStatus) => this.setState({ ...this.state, updateAuthorStatus })}
                            getAuthorDataErrorCallback={() => this.setState({ ...this.state, getModifyAuthorDataError: true })}
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
                        />
                    </PrivateRoute>

                    <Route path='/books/:id' roles={[]} >
                        <Book
                        />
                    </Route>

                    <PrivateRoute path='/books' roles={[UserRoles.RoleAdmin]}>
                        <CreateBook
                            createBookCallback={(createBookStatus: RequestStatus) => this.setState({ ...this.state, createBookStatus })}
                        />
                    </PrivateRoute>

                    <Route path='/results' roles={[]}>
                        <ResultsMenu />
                    </Route>
                </Switch>
                <Footer />
                {this.renderToasts()}
            </BrowserRouter>
        );
    }

    renderToasts() {
        const {
            registerStatus,
            loginStatus,
            editProfileStatus,
            deleteProfileStatus,
            loadAvatarError,
            createAuthorStatus,
            createBookStatus,
            updateAuthorStatus,
            getAuthorDataError,
            getModifyAuthorDataError,
            deleteAuthorStatus,
        } = this.state;
        return (
            <div>
                <Snackbar open={registerStatus === RequestStatus.SUCCESS} autoHideDuration={2000} onClose={() => this.setState({ ...this.state, registerStatus: RequestStatus.NONE })}>
                    <Alert severity='success'>Te has registrado correctamente!</Alert>
                </Snackbar>
                <Snackbar open={registerStatus === RequestStatus.ERROR} autoHideDuration={2000} onClose={() => this.setState({ ...this.state, registerStatus: RequestStatus.NONE })}>
                    <Alert severity='error'>Hubo un error al registrarse, intente mas tarde</Alert>
                </Snackbar>
                <Snackbar open={loginStatus === RequestStatus.ERROR} autoHideDuration={2000} onClose={() => this.setState({ ...this.state, loginStatus: RequestStatus.NONE })}>
                    <Alert severity='error'>No se ha podido ingresar, intente mas tarde</Alert>
                </Snackbar>
                <Snackbar open={editProfileStatus === RequestStatus.SUCCESS} autoHideDuration={2000} onClose={() => this.setState({ ...this.state, editProfileStatus: RequestStatus.NONE })}>
                    <Alert severity='success'>Se han actualizado los datos del usuario correctamente</Alert>
                </Snackbar>
                <Snackbar open={editProfileStatus === RequestStatus.ERROR} autoHideDuration={2000} onClose={() => this.setState({ ...this.state, editProfileStatus: RequestStatus.NONE })}>
                    <Alert severity='error'>No se han podido actualizar los datos correctamente, intente mas tarde</Alert>
                </Snackbar>
                <Snackbar open={deleteProfileStatus === RequestStatus.ERROR} autoHideDuration={2000} onClose={() => this.setState({ ...this.state, deleteProfileStatus: RequestStatus.NONE })}>
                    <Alert severity='error'>No se ha podido eliminar al cuenta, intente más tarde</Alert>
                </Snackbar>
                <Snackbar open={loadAvatarError} autoHideDuration={2000} onClose={() => this.setState({ ...this.state, loadAvatarError: false })}>
                    <Alert severity='error'>La imagen pesa mas de 100KB, seleccione una mas pequeña</Alert>
                </Snackbar>
                <Snackbar open={createAuthorStatus === RequestStatus.SUCCESS} autoHideDuration={2000} onClose={() => this.setState({ ...this.state, createAuthorStatus: RequestStatus.NONE })}>
                    <Alert severity='success'>Se ha creado el autor exitosamente</Alert>
                </Snackbar>
                <Snackbar open={createAuthorStatus === RequestStatus.ERROR} autoHideDuration={2000} onClose={() => this.setState({ ...this.state, createAuthorStatus: RequestStatus.NONE })}>
                    <Alert severity='error'>Hubo un error al crear el autor, intente más tarde</Alert>
                </Snackbar>
                <Snackbar open={updateAuthorStatus === RequestStatus.SUCCESS} autoHideDuration={2000} onClose={() => this.setState({ ...this.state, updateAuthorStatus: RequestStatus.NONE })}>
                    <Alert severity='success'>Se ha modificado el autor exitosamente</Alert>
                </Snackbar>
                <Snackbar open={updateAuthorStatus === RequestStatus.ERROR} autoHideDuration={2000} onClose={() => this.setState({ ...this.state, updateAuthorStatus: RequestStatus.NONE })}>
                    <Alert severity='error'>Hubo un error al modificar el autor, intente más tarde</Alert>
                </Snackbar>
                <Snackbar open={getAuthorDataError || getModifyAuthorDataError} autoHideDuration={2000} onClose={() => this.setState({ ...this.state, getAuthorDataError: false, getModifyAuthorDataError: false })}>
                    <Alert severity='error'>Hubo un error al obtener los datos del autor, intente más tarde</Alert>
                </Snackbar>
                <Snackbar open={deleteAuthorStatus === RequestStatus.SUCCESS} autoHideDuration={2000} onClose={() => this.setState({ ...this.state, deleteAuthorStatus: RequestStatus.NONE })}>
                    <Alert severity='success'>Se ha eliminado el autor exitosamente</Alert>
                </Snackbar>
                <Snackbar open={deleteAuthorStatus === RequestStatus.ERROR} autoHideDuration={2000} onClose={() => this.setState({ ...this.state, deleteAuthorStatus: RequestStatus.NONE })}>
                    <Alert severity='error'>Hubo un error al eliminar el autor, intente más tarde</Alert>
                </Snackbar>
                <Snackbar open={createBookStatus === RequestStatus.SUCCESS} autoHideDuration={2000} onClose={() => this.setState({ ...this.state, createBookStatus: RequestStatus.NONE })} >
                    <Alert severity='success'>Se ha creado el libro exitosamente</Alert>
                </Snackbar>
                <Snackbar open={createBookStatus === RequestStatus.ERROR} autoHideDuration={2000} onClose={() => this.setState({ ...this.state, createBookStatus: RequestStatus.NONE })} >
                    <Alert severity='error'>Hubo un error al crear el libro, intente más tarde</Alert>
                </Snackbar>
            </div>
        );
    }
}

export default Router;
