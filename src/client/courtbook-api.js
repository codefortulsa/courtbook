import AuthService from "./utils/AuthService";
import agent from "superagent";
import superagentAsPromised from "superagent-as-promised";
superagentAsPromised(agent, Promise);

export const fetchCourtCaseById = (courtCaseId) =>
    agent.get(`/rest/v1/cases/case/${courtCaseId}`)
        .set("Authorization", `Bearer ${AuthService.getToken()}`)
        .then(response => Promise.resolve(response.body));


export const fetchEventsByCourtCaseId = (courtCaseId) =>
    agent.get(`/rest/v1/cases/case/${courtCaseId}/events`)
        .set("Authorization", `Bearer ${AuthService.getToken()}`)
        .then(response => Promise.resolve(response.body));

export const createCase = (courtCase) =>
    agent.post("/rest/v1/cases", courtCase)
        .set("Authorization", `Bearer ${AuthService.getToken()}`)
        .then(response => {
            const createdCourtCase = response.body;
            return Promise.resolve(createdCourtCase);
        });
