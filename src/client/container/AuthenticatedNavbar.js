import React from "react";
import {Navbar, NavItem, Nav} from "react-bootstrap";
import {connect} from "react-redux";
import {logoutUser} from "../store/actions/AuthenticationActions";
import {create, home} from "../store/actions/NavigationActions";


const AuthenticatedNavbar = ({logout, navigateHome, navigateToCreatePerson}) =>
    <Navbar.Collapse>
        <Nav>
            <NavItem onClick={navigateHome}>Home</NavItem>
            <NavItem onClick={navigateToCreatePerson}>Create</NavItem>
        </Nav>
        <Nav pullRight>
            <NavItem onClick={logout}>Logout</NavItem>
        </Nav>
    </Navbar.Collapse>;

const mapDispatch = dispatch => ({
    logout: () => dispatch(logoutUser()),
    navigateToCreatePerson: () => dispatch(create()),
    navigateHome: () => dispatch(home())
});

export default connect(undefined, mapDispatch)(AuthenticatedNavbar);
