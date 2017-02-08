import React from "react";
import {Route, IndexRedirect} from "react-router";
import AuthService from "./utils/AuthService";
import Container from "./container/Container";
import Home from "./home/Home";
import Login from "./login/Login";
import LoggedOut from "./login/LoggedOut";
import CreateCourtCase from "./court-case/CreateCourtCase";
import EditCourtCaseEvents from "./court-case/events/EditCourtCaseEvents";
import EditStakeholders from "./court-case/stakeholders/EditStakeholders";
import ViewCourtCase from "./court-case/ViewCourtCase";

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
            <Route path="court-case"  onEnter={requireAuth}>
                <Route path="add" component={CreateCourtCase}/>
                <Route path=":id" components={ViewCourtCase}/>
                <Route path=":id/edit-events" components={EditCourtCaseEvents}/>
                <Route path=":id/edit-stakeholders" components={EditStakeholders}/>
            </Route>
        </Route>
    );
};

export default makeRoutes;
