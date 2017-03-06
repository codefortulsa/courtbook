import _ from "lodash";
import {SELECT_COURT_CASE, DESELECT_COURT_CASE} from "../actions/CourtCaseActions";

export const initialState = {
    courtCase: {},
    stakeholders: [],
    events: [],
    pastEvents: [],
    futureEvents: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DESELECT_COURT_CASE:
            return initialState;
        case SELECT_COURT_CASE:
            return {
                ...state,
                ...action.payload,
                events: _.union(action.payload.futureEvents, action.payload.pastEvents)
            };
        default:
            return state;
    }
};
