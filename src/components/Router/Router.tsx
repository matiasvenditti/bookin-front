import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import PrivateRoute from './PrivateRoute';
import Home from "../../scenes/main/Home/Home";
import Register from "../../scenes/session/Register/Register";
import Login from '../../scenes/session/Login/Login';
import Profile from '../../scenes/main/Profile/Profile';
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import { Snackbar } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import { RequestStatus } from "../../model/consts/RequestStatus";
import CreateAuthor from "../../scenes/main/Author/CreateAuthor";
import { UserRoles } from "../../model/consts/Roles";
import Author from "../../scenes/main/Author/Author";
import ModifyAuthor from "../../scenes/main/Author/ModifyAuthor";

interface RouterProps {

}

interface RouterState {
    reload: boolean,
    registerStatus: RequestStatus,
    loginStatus: RequestStatus,
    loadAvatarError: boolean,
    editProfileStatus: RequestStatus,
    deleteProfileStatus: RequestStatus,
    editAuthorStatus: RequestStatus,
}

class Router extends React.Component<RouterProps, RouterState> {
    constructor(props: RouterProps) {
        super(props);
        this.state = {
            reload: false,
            registerStatus: RequestStatus.NONE,
            loginStatus: RequestStatus.NONE,
            editProfileStatus: RequestStatus.NONE,
            loadAvatarError: false,
            deleteProfileStatus: RequestStatus.NONE,
            editAuthorStatus: RequestStatus.NONE,
        };
    }

    render() {
        return (
            <BrowserRouter>
                <Menu logoutCallback={() => this.setState({ reload: true })} />
                <Switch>
                    <Route exact path='/'><Home /></Route>
                    <Route path='/register' >
                        <Register registerCallback={(registerStatus: RequestStatus, loginStatus: RequestStatus) =>
                            this.setState({ ...this.state, registerStatus, loginStatus })}
                        />
                    </Route>
                    <Route path='/login' >
                        <Login loginCallback={(loginStatus: RequestStatus) =>
                            this.setState({ ...this.state, loginStatus })}
                        />
                    </Route>
                    <PrivateRoute path='/profile' roles={[]} >
                        <Profile
                            deleteProfileCallback={(deleteProfileStatus: RequestStatus) => this.setState({ ...this.state, deleteProfileStatus })}
                            onLoadErrorCallback={() => this.setState({ ...this.state, loadAvatarError: true })}
                            editProfileCallback={(editProfileStatus: RequestStatus) => this.setState({ ...this.state, editProfileStatus })}
                        />
                    </PrivateRoute>

                    <PrivateRoute path='/authors/edit/:id' roles={[UserRoles.RoleAdmin]}><ModifyAuthor/></PrivateRoute>

                    <Route path='/authors/:id' roles={[]} >
                        <Author
                            loadAvatarErrorCallback={() => this.setState({ ...this.state, loadAvatarError: true })}
                            editAuthorCallback={(editAuthorStatus: RequestStatus) =>
                                this.setState({ ...this.state, editAuthorStatus })}
                        />
                    </Route>
                    <PrivateRoute path='/authors' roles={[UserRoles.RoleAdmin]}><CreateAuthor /></PrivateRoute>
                </Switch>
                <Footer />
                {this.renderToasts()}
            </BrowserRouter>
        );
    }

    renderToasts() {
        const { registerStatus, loginStatus, editProfileStatus, deleteProfileStatus, loadAvatarError } = this.state;
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
            </div>
        );
    }
}

export default Router;
