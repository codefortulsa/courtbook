import AuthService from "../../utils/AuthService";
import {loggedOut} from "./NavigationActions";

export const logoutUser = () => dispatch => {
    AuthService.logout();
    dispatch(loggedOut());
};

export const promptForLogin = () => (dispatch, getState) => {
    getState().auth.authService.login();
};
