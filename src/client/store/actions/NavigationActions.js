import {push} from "react-router-redux";

export const createReminders = () => push('/createReminders');

export const loggedOut = () => push('/loggedOut');

export const home = () => push('/home');
