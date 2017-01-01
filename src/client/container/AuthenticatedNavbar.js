import React from "react";
import {Navbar, NavItem, Nav} from "react-bootstrap";
import {connect} from "react-redux";
import {logoutUser} from "../store/actions/AuthenticationActions";
import {home, createReminders} from "../store/actions/NavigationActions";


const AuthenticatedNavbar = ({logout, navigateHome, navigateToCreateReminders}) =>
    <Navbar.Collapse>
        <Nav>
            <NavItem onClick={navigateHome}>Home</NavItem>
            <NavItem onClick={navigateToCreateReminders}>Create Reminders</NavItem>
        </Nav>
        <Nav pullRight>
            <NavItem onClick={logout}>Logout</NavItem>
        </Nav>
    </Navbar.Collapse>;

const mapDispatch = dispatch => ({
    logout: () => dispatch(logoutUser()),
    navigateToCreateReminders: () => dispatch(createReminders()),
    navigateHome: () => dispatch(home())
});

export default connect(undefined, mapDispatch)(AuthenticatedNavbar);
