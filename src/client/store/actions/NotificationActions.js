import {Chance} from 'chance';

const chance = new Chance();

export const DISMISS_NOTIFICATION = "DISMISS_NOTIFICATION";
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";

export const dismissNotification = (notification) => ({
    type: DISMISS_NOTIFICATION,
    payload: notification
});

const addNotification = (notification) => dispatch({
    type: ADD_NOTIFICATION,
    payload: notification
});

export const error = (dispatch) => (message) => dispatch(addNotification({
    message,
    key: chance.guid(),
    action: 'Dismiss',
    dismissAfter: false
}));

