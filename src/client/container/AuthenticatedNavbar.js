import React from "react";
import {Navbar, NavItem, Nav} from "react-bootstrap";
import {connect} from "react-redux";
import {logoutUser} from "../store/actions/AuthenticationActions";


const AuthenticatedNav = ({logout}) =>
    <Navbar.Collapse>
        <Nav pullRight>
            <NavItem onClick={logout}>Logout</NavItem>
        </Nav>
    </Navbar.Collapse>;

const mapDispatch = dispatch => ({
    logout: () => dispatch(logoutUser())
});

export default connect(undefined, mapDispatch)(AuthenticatedNav);
