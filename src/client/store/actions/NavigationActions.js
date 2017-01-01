import {push} from "react-router-redux";

export const create = () => push('/create');

export const loggedOut = () => push('/loggedOut');

export const home = () => push('/home');
