import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import PrivateRoute from './PrivateRoute';
import Home from "../../scenes/main/Home/Home";
import Signup from '../../scenes/session/Signup/Signup';
import Signin from '../../scenes/session/Signin/Signin';
import Profile from '../../scenes/main/Profile/Profile';
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import AuthorForm from "../../scenes/main/Author/AuthorForm";
import CreateAuthor from "../../scenes/main/Author/CreateAuthor";

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
                    <Route path='/create-author'><CreateAuthor /></Route>
                </Switch>
                <Footer />
            </BrowserRouter>
        );
    }
}

export default Router;
