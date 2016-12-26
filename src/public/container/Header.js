import React from "react";
import {Navbar, NavItem, Nav} from "react-bootstrap";
import AuthService from "../utils/AuthService";

const AuthenticatedNav = () =>
    <Navbar.Collapse>
        <Nav pullRight>
            <LogoutNavItem/>
        </Nav>
    </Navbar.Collapse>;

const LogoutNavItem = () => <NavItem onClick={AuthService.logout}>Logout</NavItem>;

const Header = () => {
    return (
        <div>
            <Navbar inverse collapseOnSelect fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Courtbook</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                {AuthService.loggedIn() ? <AuthenticatedNav/> : null}
            </Navbar>
        </div>
    );
};

export default Header;
