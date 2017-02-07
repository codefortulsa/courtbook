import _ from 'lodash';
import {ADD_NOTIFICATION, DISMISS_NOTIFICATION} from "../actions/NotificationActions";

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return _.concat(state, action.payload);
        case DISMISS_NOTIFICATION:
            return _.without(state, action.payload);
        default:
            return state;
    }
};
