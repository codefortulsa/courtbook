import {navigateAddCaseEvents} from "./NavigationActions";
import {fetchCourtCaseById, createCase, fetchEventsByCourtCaseId} from "../../courtbook-api";

export const CREATE_COURT_CASE = "CREATE_COURT_CASE";
export const SELECT_COURT_CASE = "SELECT_COURT_CASE";

export const createCourtCase = (courtCase) => (dispatch) => ({
    type: "CREATE_COURT_CASE",
    payload: createCase(courtCase)
        .then((createdCourtCase) => dispatch(navigateAddCaseEvents(createdCourtCase.id)))
});

export const fetchAndSelectCourtCase = (courtCaseId) => (dispatch) => {
    Promise.all([
        fetchCourtCaseById(courtCaseId),
        fetchEventsByCourtCaseId(courtCaseId)
    ]).then(resolve => dispatch({
        type: SELECT_COURT_CASE,
        payload: {
            courtCase: resolve[0],
            events: resolve[1]
        }
    }));
};

export const editCourtCaseEvents = (courtCaseEvents) => {
    return {
        type: "EDIT_COURT_CASE_EVENTS",
        payload: courtCaseEvents
    };
};