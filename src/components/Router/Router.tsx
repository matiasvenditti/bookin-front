import {BrowserRouter, Route, Switch} from "react-router-dom";
import Menu from "../../scenes/Menu/Menu";
import React from "react";

// Router component responsible for routing specific logic
class Router extends React.Component<{}, {}> {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/books/:id' component={Menu} exact/>
                </Switch>
            </BrowserRouter>
        );
    }

}

export default Router;

