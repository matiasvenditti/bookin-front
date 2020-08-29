import React from "react";
import {Redirect, Route} from "react-router-dom";
import {isAuthorized, isLoggedIn} from "../../services/AuthService";

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
        return <Redirect to={'/signin'} />
    }

    if (!isAuthorized(roles)) {
        return <Redirect exact to={'/'} />
    }

    return <Route exact={exact} path={path}>{children}</Route>
};

export default PrivateRoute;
