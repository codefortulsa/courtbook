import {FETCH_UPCOMING_EVENTS} from "../actions/UpcomingEventsActions";

const initialState = {
    events: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case `${FETCH_UPCOMING_EVENTS}_FULFILLED`:
            return {...state, events: action.payload};
        default:
            return state;
    }
};
