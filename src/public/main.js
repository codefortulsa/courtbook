import React from "react";
import ReactDOM from "react-dom";
import {Router, browserHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import {Provider} from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import store from "./store/redux-store";
import makeRoutes from "./routes";

const history = syncHistoryWithStore(browserHistory, store);

const App = ({routes, history}) =>
    <Provider store={store}>
        <Router routes={routes} history={history}/>
    </Provider>;

App.propTypes = {
    history: React.PropTypes.object.isRequired,
    routes: React.PropTypes.element.isRequired
};

const routes = makeRoutes();

ReactDOM.render(<App history={history} routes={routes}/>, document.querySelector('#app'));
