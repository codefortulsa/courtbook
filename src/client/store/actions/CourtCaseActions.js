import {courtCaseSummary} from "./NavigationActions";
import AuthService from "../../utils/AuthService";
import agent from "superagent";
import superagentAsPromised from "superagent-as-promised";
superagentAsPromised(agent, Promise);

export const COURT_CASE_FORM_NAME = "courtCasesForm";
export const CREATE_COURT_CASE = "CREATE_COURT_CASE";

export const createCourtCase = (personCourtCases, dispatch) => {
    return {
        type: "CREATE_COURT_CASE",
        payload: agent
            .post("/rest/v1/courtCases", personCourtCases)
            .set("Authorization", `Bearer ${AuthService.getToken()}`)
            .then(response => {
                const createdCourtCase = response.body;
                dispatch(courtCaseSummary(createdCourtCase.id));
                return Promise.resolve(createdCourtCase);
            })
    };
};


export const fetchCourtCase = (caseNumber, defendant) => {
    return {
        type: "FETCH_CREATE_COURT_CASE",
        payload: agent
            .get(`/rest/v1/courtCases/${personId}`)
            .set("Authorization", `Bearer ${AuthService.getToken()}`)
            .then(response => Promise.resolve(response.body))
    };
};
