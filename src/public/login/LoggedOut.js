import React from "react";
import Login from './Login';

const LoggedOut = ({auth}) => (
    <div>
        You have been logged out.
        <Login auth={auth}/>
    </div>
);

export default LoggedOut;
