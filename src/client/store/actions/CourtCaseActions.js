import {navigateAddCaseEvents} from "./NavigationActions";
import AuthService from "../../utils/AuthService";
import agent from "superagent";
import superagentAsPromised from "superagent-as-promised";
superagentAsPromised(agent, Promise);

export const CREATE_COURT_CASE = "CREATE_COURT_CASE";
export const FETCH_COURT_CASE = "FETCH_COURT_CASE";
export const FETCH_COURT_CASE_EVENTS = "FETCH_COURT_CASE_EVENTS";

export const createCourtCase = (courtCase, dispatch) => {
    return {
        type: "CREATE_COURT_CASE",
        payload: agent
            .post("/rest/v1/cases", courtCase)
            .set("Authorization", `Bearer ${AuthService.getToken()}`)
            .then(response => {
                const createdCourtCase = response.body;
                dispatch(navigateAddCaseEvents(createdCourtCase.id));
                return Promise.resolve(createdCourtCase);
            })
    };
};

export const fetchCourtCase = (courtCaseId) => (dispatch) => {
    dispatch({
        type: "FETCH_COURT_CASE",
        payload: agent
            .get(`/rest/v1/cases/case/${courtCaseId}`)
            .set("Authorization", `Bearer ${AuthService.getToken()}`)
            .then(response => Promise.resolve(response.body))
    });

    dispatch({
        type: "FETCH_COURT_CASE_EVENTS",
        payload: agent
            .get(`/rest/v1/cases/case/${courtCaseId}/events`)
            .set("Authorization", `Bearer ${AuthService.getToken()}`)
            .then(response => Promise.resolve(response.body))
    });
};

export const editCourtCaseEvents = (courtCaseEvents) => {
    return {
        type: "EDIT_COURT_CASE_EVENTS",
        payload: courtCaseEvents
    };
};
