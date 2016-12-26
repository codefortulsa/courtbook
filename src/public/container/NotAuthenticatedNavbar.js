import React from "react";
import {Navbar, NavItem, Nav} from "react-bootstrap";
import {connect} from "react-redux";
import {promptForLogin} from "../store/actions/AuthenticationActions";

const NotAuthenticatedNavbar = ({login}) =>
    <Navbar.Collapse>
        <Nav pullRight>
            <NavItem onClick={login}>Login</NavItem>
        </Nav>
    </Navbar.Collapse>;

const mapDispatchToProps = (dispatch) => ({
    login: () => dispatch(promptForLogin())
});

export default connect(undefined, mapDispatchToProps)(NotAuthenticatedNavbar);
