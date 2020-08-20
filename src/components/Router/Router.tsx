import { BrowserRouter, Route, Switch } from "react-router-dom";
import Menu from "../../scenes/Menu/Menu";
import React from "react";
import PrivateRoute from './PrivateRoute';

// Router component responsible for routing specific logic
class Router extends React.Component<{}, {}> {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Menu} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
