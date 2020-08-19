import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { getUserRoles } from "../../model/Roles";
import { isLoggedIn, isAuthorized } from "../../services/AuthService";

interface PrivateRouteProps {
    // isLoggedIn: boolean,
    // isRoleValid: boolean,
    exact: boolean,
    path: string,
    component: typeof Component,
    redirectTo?: string,
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const {
        // isLoggedIn,
        exact,
        path,
        component,
        redirectTo,
    } = props;

    if (!isLoggedIn()) {
        return <Redirect to={redirectTo || '/'} />
    }

    const userRoles: string[] = getUserRoles();
    if (!isAuthorized(userRoles, [])) {
        return <Redirect to={redirectTo || '/'} />
    }

    return <Route exact={exact} path={path} component={component} />
};

export default PrivateRoute;
