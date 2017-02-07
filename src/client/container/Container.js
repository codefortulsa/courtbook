import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Notifications from "./Notifications";

const Container = ({route, children}) => {
    if (children) {
        children = React.cloneElement(children, {
            auth: route.auth //sends auth instance from route to children
        })
    }

    return (
        <div className="container-fluid">
            <Header/>
            <Notifications/>
            {children}
            <Footer/>
        </div>
    )
};

export default Container;
