import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import PrivateRoute from './PrivateRoute';
import Home from "../../scenes/main/Home/Home";
import Signup from '../../scenes/session/Signup/Signup';
import Signin from '../../scenes/session/Login/Login';
import Profile from '../../scenes/main/Profile/Profile';
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";

// Router component responsible for routing specific logic
class Router extends React.Component<{}, {}> {
    render() {
        return (
            <BrowserRouter>
                <Menu />
                <Switch>
                    <Route exact path='/'><Home /></Route>
                    <Route path='/signup' ><Signup /></Route>
                    <Route path='/signin' ><Signin /></Route>
                    <PrivateRoute path='/profile' roles={[]} ><Profile /></PrivateRoute>
                </Switch>
                <Footer />
            </BrowserRouter>
        );
    }
}

export default Router;
