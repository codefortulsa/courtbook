import {SELECT_COURT_CASE} from "../actions/CourtCaseActions";

const initialState = {
    courtCase: {},
    events: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECT_COURT_CASE:
            return {...state, ...action.payload};
        default:
            return state;
    }
};
