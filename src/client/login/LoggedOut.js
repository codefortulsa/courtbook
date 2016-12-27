import React from "react";
import Login from './Login';
import {Alert} from 'react-bootstrap';

const LoggedOut = ({auth}) => (
    <div>
        <Alert bsStyle="success">You have been logged out.</Alert>
        <Login auth={auth}/>
    </div>
);

export default LoggedOut;
