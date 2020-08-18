import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps {
    isLoggedIn: boolean,
    exact: boolean,
    path: string,
    component: typeof Component,
    redirectTo?: string,
}

class PrivateRoute extends Component<PrivateRouteProps> {
    render() {
        const {
            isLoggedIn,
            exact,
            path,
            component,
            redirectTo, 
        } = this.props;
        return (
            isLoggedIn ? 
                <Route exact={exact} path={path} component={component} /> 
                : 
                <Redirect to={redirectTo || '/'}/>
        );
    }
}

export default PrivateRoute;
