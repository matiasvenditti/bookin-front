import React from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthService } from "../../services";

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

    if (!AuthService.isLoggedIn()) {
        return <Redirect to={'/login'} />
    }

    if (!AuthService.isAuthorized(roles)) {
        return <Redirect exact to={'/'} />
    }

    return <Route exact={exact} path={path} children={children}></Route>
};

export default PrivateRoute;
