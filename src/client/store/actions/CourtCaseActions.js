import {navigateViewCourtCase} from "./NavigationActions";
import {
    fetchCourtCaseById,
    createCase,
    fetchStakeholdersByCourtCaseId,
    fetchPastEventsByCourtCaseId,
    fetchFutureEventsByCourtCaseId
} from "../../courtbook-api";

export const CREATE_COURT_CASE = "CREATE_COURT_CASE";
export const SELECT_COURT_CASE = "SELECT_COURT_CASE";
export const DESELECT_COURT_CASE = "DESELECT_COURT_CASE";

export const createCourtCase = (courtCase) => (dispatch) => ({
    type: "CREATE_COURT_CASE",
    payload: createCase(courtCase)
        .then((createdCourtCase) => dispatch(navigateViewCourtCase(createdCourtCase.id)))
});

export const fetchAndSelectCourtCase = (courtCaseId) => (dispatch) => {
    dispatch({type: DESELECT_COURT_CASE});

    Promise.all([
        fetchCourtCaseById(courtCaseId),
        fetchStakeholdersByCourtCaseId(courtCaseId),
        fetchPastEventsByCourtCaseId(courtCaseId),
        fetchFutureEventsByCourtCaseId(courtCaseId)
    ]).then(resolve => dispatch({
        type: SELECT_COURT_CASE,
        payload: {
            courtCase: resolve[0],
            stakeholders: resolve[1],
            pastEvents: resolve[2],
            futureEvents: resolve[3]
        }
    }));
};
