import {push} from "react-router-redux";

export const loggedOut = () => push('/loggedOut');

export const navigateHome = () => push('/home');

export const navigateViewCourtCase = (courtCaseId) => push(`/court-case/${courtCaseId}`);

export const navigateSearchCourtCase = () => push('/court-case/search');

export const navigateAddCourtCase = () => push('/court-case/add');

export const navigateEditEvents = (courtCaseId) => push(`/court-case/${courtCaseId}/edit-events`);

export const navigateEditStakeholders = (courtCaseId) => push(`/court-case/${courtCaseId}/edit-stakeholders`);
