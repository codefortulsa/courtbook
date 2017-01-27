import React from "react";
import {Route, IndexRedirect} from "react-router";
import AuthService from "./utils/AuthService";
import Container from "./container/Container";
import Home from "./home/Home";
import Login from "./login/Login";
import LoggedOut from "./login/LoggedOut";
import CreateCourtCase from "./court-case/CreateCourtCase";
import ViewCourtCases from "./court-case/ViewCourtCases";

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
            <Route path="/court-case/add" component={CreateCourtCase} onEnter={requireAuth}/>
            <Route path="/court-case/:personId" components={ViewCourtCases} onEnter={requireAuth}/>
            <Route path="login" component={Login}/>
            <Route path="loggedOut" component={LoggedOut}/>
        </Route>
    );
};

export default makeRoutes;
