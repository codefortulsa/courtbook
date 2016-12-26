import {createStore, applyMiddleware} from "redux";
import reduxPromiseMiddleware from "redux-promise-middleware";
import thunkMiddleware from "redux-thunk";
import {routerMiddleware} from "react-router-redux";
import {browserHistory} from "react-router";
import reducers from "./reducers/reducers";

const reactRouterMiddleware = routerMiddleware(browserHistory);

const createStoreWithMiddleware =
    applyMiddleware(reduxPromiseMiddleware(), thunkMiddleware, reactRouterMiddleware)(createStore);

const REDUX_STORE = createStoreWithMiddleware(reducers, {},
    (global.window && global.window.devToolsExtension) ? global.window.devToolsExtension() : f => f
);

export default REDUX_STORE;
