import React from "react";
import {Navbar, NavItem, Nav} from "react-bootstrap";
import {connect} from "react-redux";
import {logoutUser} from "../store/actions/AuthenticationActions";
import {navigateHome, navigateAddCourtCase, navigateSearchCourtCase} from "../store/actions/NavigationActions";

const AuthenticatedNavbar = ({logout, navigateHome, navigateAddCourtCase, navigateSearchCourtCase}) =>
    <Navbar.Collapse>
        <Nav>
            <NavItem onClick={navigateHome}>Home</NavItem>
            <NavItem onClick={navigateSearchCourtCase}>Search</NavItem>
            <NavItem onClick={navigateAddCourtCase}>Add Court Case</NavItem>
        </Nav>
        <Nav pullRight>
            <NavItem onClick={logout}>Logout</NavItem>
        </Nav>
    </Navbar.Collapse>;

const mapDispatch = dispatch => ({
    logout: () => dispatch(logoutUser()),
    navigateAddCourtCase: () => dispatch(navigateAddCourtCase()),
    navigateSearchCourtCase: () => dispatch(navigateSearchCourtCase()),
    navigateHome: () => dispatch(navigateHome())
});

export default connect(undefined, mapDispatch)(AuthenticatedNavbar);
