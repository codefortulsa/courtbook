import {push} from "react-router-redux";

export const loggedOut = () => push('/loggedOut');

export const navigateHome = () => push('/home');

export const navigateAddCourtCase = () => push('/court-case/add');

export const navigateAddCaseEvents = (courtCaseId) => push(`/court-case/${courtCaseId}/edit-events`);
