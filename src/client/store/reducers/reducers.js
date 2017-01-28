import {combineReducers, } from "redux";
import {routerReducer} from "react-router-redux";
import {reducer as formReducer} from "redux-form";
import authReducer from "./authReducer";
import createCourtCaseReducer from "./createCourtCaseReducer";
import selectedCaseReducer from "./selectedCaseReducer";

const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    auth: authReducer,
    createCourtCase: createCourtCaseReducer,
    selectedCase: selectedCaseReducer
});

export default rootReducer;
