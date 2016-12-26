import React from "react";
import {Button} from "react-bootstrap";
import {connect} from "react-redux";
import {promptForLogin} from "../store/actions/AuthenticationActions";

const Login = ({login}) => (
    <div className="text-center">
        <h3>Please log in to Courtbook.</h3>
        <Button bsStyle="primary" onClick={login}>Sign In</Button>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    login: () => dispatch(promptForLogin())
});

export default connect(undefined, mapDispatchToProps)(Login);
