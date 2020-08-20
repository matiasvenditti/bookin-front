import { BrowserRouter, Route, Switch } from "react-router-dom";
import Menu from "../../scenes/Menu/Menu";
import React from "react";
import Signup from "../../scenes/Signup/Signup";

// Router component responsible for routing specific logic
class Router extends React.Component<{}, {}> {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact><Menu/></Route>
                    <Route path='/signup' exact><Signup/></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
