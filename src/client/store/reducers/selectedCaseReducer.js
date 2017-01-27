import {fulfilledType} from "./actionStatus";
import {FETCH_COURT_CASE, FETCH_COURT_CASE_EVENTS} from "../actions/CourtCaseActions";

const initialState = {
    courtCase: {},
    events: []
};

export default (state=initialState, action) => {
    switch (action.type) {
        case fulfilledType(FETCH_COURT_CASE):
            return {...state, courtCase: action.payload};
        case fulfilledType(FETCH_COURT_CASE_EVENTS):
            return {...state, events: action.payload};
        default:
            return state;
    }
};
