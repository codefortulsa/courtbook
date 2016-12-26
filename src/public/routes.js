import React from "react";
import {Route, IndexRedirect} from "react-router";
import AuthService from "./utils/AuthService";
import Container from "./container/Container";
import Home from "./Home/Home";
import Login from "./Login/Login";
import LoggedOut from "./Login/LoggedOut";

const requireAuth = (nextState, replace) => {
    if (!AuthService.loggedIn()) {
        replace({pathname: '/login'});
    }
};

export const makeRoutes = () => {
    return (
        <Route path="/" component={Container}>
            <IndexRedirect to="/home"/>
            <Route path="home" component={Home} onEnter={requireAuth}/>
            <Route path="login" component={Login}/>
            <Route path="loggedOut" component={LoggedOut}/>
        </Route>
    );
};

export default makeRoutes;
