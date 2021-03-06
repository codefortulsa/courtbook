import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {reducer as formReducer} from "redux-form";
import authReducer from "./authReducer";
import createCourtCaseReducer from "./createCourtCaseReducer";
import selectedCaseReducer from "./selectedCaseReducer";
import upcomingEventsReducer from "./upcomingEventsReducer";
import searchCourtCasesReducer from "./searchCourtCasesReducer";

const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    auth: authReducer,
    createCourtCase: createCourtCaseReducer,
    selectedCase: selectedCaseReducer,
    upcomingEvents: upcomingEventsReducer,
    searchCourtCases: searchCourtCasesReducer
});

export default rootReducer;
