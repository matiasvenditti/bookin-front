import { BrowserRouter, Route, Switch } from "react-router-dom";
import Menu from "../../scenes/Menu/Menu";
import React from "react";
import PrivateRoute from './PrivateRoute';
import Register from "../../scenes/session/Register/Register";

// Router component responsible for routing specific logic
class Router extends React.Component<{}, {}> {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Menu} />
                    <Route path='/register' component={Register} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
