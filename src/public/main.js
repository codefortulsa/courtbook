import React from "react";
import ReactDOM from "react-dom";
import {Router, browserHistory} from "react-router";
import "bootstrap/dist/css/bootstrap.css";
import makeRoutes from "./routes";

const App = ({routes, history}) =>
    <Router routes={routes} history={history}/>;

App.propTypes = {
    history: React.PropTypes.object.isRequired,
    routes: React.PropTypes.element.isRequired
};

const routes = makeRoutes();

ReactDOM.render(<App history={browserHistory} routes={routes}/>, document.querySelector('#app'));
