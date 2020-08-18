import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

interface PrivateRouteProps {
    isLoggedIn: boolean,
    isRoleValid: boolean,
    exact: boolean,
    path: string,
    component: typeof Component,
    redirectTo?: string,
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const {
        isLoggedIn,
        exact,
        path,
        component,
        redirectTo,  
    } = props;
    
    return (
        isLoggedIn ?
            <Route exact={exact} path={path} component={component} /> 
            :
            <Redirect to={redirectTo || '/'} />
    );
};

export default PrivateRoute;
