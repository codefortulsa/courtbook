import React from "react";
import {Navbar} from "react-bootstrap";
import AuthService from "../utils/AuthService";
import AuthenticatedNavbar from "./AuthenticatedNavbar";
import NotAuthenticatedNavbar from "./NotAuthenticatedNavbar";

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
                {AuthService.loggedIn() ? <AuthenticatedNavbar/> : <NotAuthenticatedNavbar/>}
            </Navbar>
        </div>
    );
};

export default Header;
