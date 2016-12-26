import {push} from "react-router-redux";
import AuthService from "../../utils/AuthService";

export const logoutUser = () => dispatch => {
    AuthService.logout();
    dispatch(push('/loggedOut'));
};

export const promptForLogin = () => (dispatch, getState) => {
    getState().auth.authService.login();
};
