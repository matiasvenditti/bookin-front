import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn, isAuthorized } from "../../services/AuthService";

interface PrivateRouteProps {
    exact?: boolean,
    path: string,
    roles: string[],
    children: any
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const {
        exact,
        path,
        children,
        roles,
    } = props;

    if (!isLoggedIn()) {
        return <Redirect to={'/login'} />
    }

    if (!isAuthorized(roles)) {
        return <Redirect exact to={'/'} />
    }

    return <Route exact={exact} path={path}>{children}</Route>
};

export default PrivateRoute;
