import React, {PropTypes as T} from "react";
import {ButtonToolbar, Button} from "react-bootstrap";
import AuthService from "../utils/AuthService";

const Login = ({auth}) => (
    <div>
        <h2>Login</h2>
        <ButtonToolbar>
            <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
        </ButtonToolbar>
    </div>
);

Login.propTypes = {
    auth: T.instanceOf(AuthService)
};

export default Login;
