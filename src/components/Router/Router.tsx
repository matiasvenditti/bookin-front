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


interface RouterProps {

}

interface RouterState {
    reload: boolean,
    registerStatus: RequestStatus,
    loginStatus: RequestStatus,
}

class Router extends React.Component<RouterProps, RouterState> {
    constructor(props: RouterProps) {
        super(props);
        this.state = {
            reload: false,
            registerStatus: RequestStatus.NONE,
            loginStatus: RequestStatus.NONE,
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
                    <Route path='/login' ><Login loginCallback={(loginStatus: RequestStatus) => this.setState({ ...this.state, loginStatus })} /></Route>
                    <PrivateRoute path='/profile' roles={[]} ><Profile /></PrivateRoute>
                </Switch>
                <Footer />
                {this.renderToasts()}
            </BrowserRouter>
        );
    }

    renderToasts() {
        const { registerStatus, loginStatus } = this.state;
        return ([
            <Snackbar
                open={registerStatus === RequestStatus.SUCCESS}
                autoHideDuration={2000}
            >
                <Alert severity='success'>
                    Te has registrado correctamente!
                </Alert>
            </Snackbar>,
            <Snackbar
                open={registerStatus === RequestStatus.ERROR}
                autoHideDuration={2000}
            >
                <Alert severity='error'>
                    Hubo un error al registrarse, intente mas tarde.'
                </Alert>
            </Snackbar>,
            <Snackbar
                open={loginStatus === RequestStatus.ERROR}
                autoHideDuration={2000}
            >
                <Alert severity='error'>
                    No se ha podido ingresar, intente mas tarde.'
                </Alert>
            </Snackbar>,
        ]);
    }
}

export default Router;
