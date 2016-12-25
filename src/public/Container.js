import React from "react";
import {Jumbotron} from "react-bootstrap";

const Container = ({route, children}) => {
    if (children) {
        children = React.cloneElement(children, {
            auth: route.auth //sends auth instance from route to children
        })
    }

    return (
        <Jumbotron>
            <h2>
                <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg"/>
            </h2>
            {children}
        </Jumbotron>
    )
};

export default Container;
