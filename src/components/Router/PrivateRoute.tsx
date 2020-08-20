import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn, isAuthorized } from "../../services/AuthService";

interface PrivateRouteProps {
    exact?: boolean,
    path: string,
    component: typeof Component,
    requiredRoles: string[]
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const {
        exact,
        path,
        component,
        requiredRoles,
    } = props;

    if (!isLoggedIn()) {
        return <Redirect to={'/login'} />
    }

    if (!isAuthorized(requiredRoles)) {
        return <Redirect exact to={'/'} />
    }

    return <Route exact={exact} path={path} component={component} />
};

export default PrivateRoute;
