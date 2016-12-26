import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Container = ({route, children}) => {
    if (children) {
        children = React.cloneElement(children, {
            auth: route.auth //sends auth instance from route to children
        })
    }

    return (
        <div className="container-fluid">
            <Header/>
            {children}
            <Footer/>
        </div>
    )
};

export default Container;
