import { BrowserRouter, Route, Switch } from "react-router-dom";
import Menu from "../../scenes/Menu/Menu";
import React from "react";
import PrivateRoute from './PrivateRoute';
import Register from "../../scenes/session/Register/Register";
import Signup from "../../scenes/Signup/Signup";

// Router component responsible for routing specific logic
class Router extends React.Component<{}, {}> {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Menu} />
                    {/* <Route path='/register' component={Register} />
                    <Route path='/' exact><Menu/></Route>
                    <Route path='/signup' exact><Signup/></Route> */}
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
