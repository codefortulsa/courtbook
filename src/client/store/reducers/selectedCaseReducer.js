import {SELECT_COURT_CASE, DESELECT_COURT_CASE} from "../actions/CourtCaseActions";

const initialState = {
    courtCase: {},
    events: [],
    stakeholders: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DESELECT_COURT_CASE:
            return initialState;
        case SELECT_COURT_CASE:
            return {...state, ...action.payload};
        default:
            return state;
    }
};
