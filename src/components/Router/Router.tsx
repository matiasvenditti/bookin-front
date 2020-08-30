import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import PrivateRoute from './PrivateRoute';
import Home from "../../scenes/main/Home/Home";
import Signup from '../../scenes/session/Signup/Signup';
import Login from '../../scenes/session/Login/Login';
import Profile from '../../scenes/main/Profile/Profile';
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import CreateAuthor from "../../scenes/main/Author/CreateAuthor";

interface RouterProps {

}

interface RouterState {
    reload: boolean
}

class Router extends React.Component<RouterProps, RouterState> {
    constructor(props: RouterProps) {
        super(props);
        this.state = { reload: false };
    }
    render() {
        return (
            <BrowserRouter>
                <Menu logoutCallback={() => this.setState({ reload: true })} />
                <Switch>
                    <Route exact path='/'><Home /></Route>
                    <Route path='/signup' ><Signup registerCallback={() => this.setState({ reload: true })} /></Route>
                    <Route path='/signin' ><Login loginCallback={() => this.setState({ reload: true })} /></Route>
                    <PrivateRoute path='/profile' roles={[]} ><Profile /></PrivateRoute>
                    <PrivateRoute path='/authors' roles={["ROLE_ADMIN"]}><CreateAuthor/></PrivateRoute>
                </Switch>
                <Footer />
            </BrowserRouter>
        );
    }
}

export default Router;
