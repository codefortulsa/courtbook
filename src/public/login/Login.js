import React from "react";
import {ButtonToolbar, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {promptForLogin} from "../store/actions/AuthenticationActions";

const Login = ({login}) => (
    <div>
        <h2>Login</h2>
        <ButtonToolbar>
            <Button bsStyle="primary" onClick={login}>Login</Button>
        </ButtonToolbar>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    login: () => dispatch(promptForLogin())
});

export default connect(undefined, mapDispatchToProps)(Login);
