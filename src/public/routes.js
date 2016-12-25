import React from "react";
import {Route, IndexRedirect} from "react-router";
import AuthService from "./utils/AuthService";
import Container from "./Container";
import Home from "./Home/Home";
import Login from "./Login/Login";

const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);

const requireAuth = (nextState, replace) => {
    if (!auth.loggedIn()) {
        replace({pathname: '/login'});
    }
};

export const makeRoutes = () => {
    return (
        <Route path="/" component={Container} auth={auth}>
            <IndexRedirect to="/home"/>
            <Route path="home" component={Home} onEnter={requireAuth}/>
            <Route path="login" component={Login}/>
        </Route>
    );
};

export default makeRoutes;
