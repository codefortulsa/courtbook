import AuthService from "../../utils/AuthService";

const defaultState = {
    authService: new AuthService(__AUTH0_COURTBOOK_UI_CLIENT_ID__, __AUTH0_DOMAIN__)
};

export default (state = defaultState, action) => state;
