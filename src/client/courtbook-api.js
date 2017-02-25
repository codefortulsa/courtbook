import AuthService from "./utils/AuthService";
import agent from "superagent";
import superagentAsPromised from "superagent-as-promised";
superagentAsPromised(agent, Promise);

export const fetchCourtCaseById = (courtCaseId) =>
    agent.get(`/rest/v1/cases/${courtCaseId}`)
        .set("Authorization", `Bearer ${AuthService.getToken()}`)
        .then(response => Promise.resolve(response.body));

export const fetchEventsByCourtCaseId = (courtCaseId) =>
    agent.get(`/rest/v1/cases/${courtCaseId}/events`)
        .set("Authorization", `Bearer ${AuthService.getToken()}`)
        .then(response => Promise.resolve(response.body));

export const fetchStakeholdersByCourtCaseId = (courtCaseId) =>
    agent.get(`/rest/v1/cases/${courtCaseId}/stakeholders`)
        .set("Authorization", `Bearer ${AuthService.getToken()}`)
        .then(response => Promise.resolve(response.body));

export const createCase = (courtCase) =>
    agent.post("/rest/v1/cases", courtCase)
        .set("Authorization", `Bearer ${AuthService.getToken()}`)
        .then(response => Promise.resolve(response.body));

export const deleteEventById = (id) =>
    agent.delete(`/rest/v1/events/${id}`)
        .set("Authorization", `Bearer ${AuthService.getToken()}`)
        .then(response => Promise.resolve(id));

export const createEvent = (event) =>
    agent.post(`/rest/v1/events`, event)
        .set("Authorization", `Bearer ${AuthService.getToken()}`)
        .then(response => Promise.resolve(response.body));

export const getUpcomingEvents = () =>
    agent.get(`/rest/v1/events/upcoming`)
        .set("Authorization", `Bearer ${AuthService.getToken()}`)
        .then(response => Promise.resolve(response.body));

export const updateEvent = (event) =>
    agent.put(`/rest/v1/events`, event)
        .set("Authorization", `Bearer ${AuthService.getToken()}`)
        .then(response => Promise.resolve(response.body));

export const deleteStakeholderById = (id) =>
    agent.delete(`/rest/v1/stakeholders/${id}`)
        .set("Authorization", `Bearer ${AuthService.getToken()}`)
        .then(response => Promise.resolve(id));

export const createStakeholder = (stakeholder) =>
    agent.post(`/rest/v1/stakeholders`, stakeholder)
        .set("Authorization", `Bearer ${AuthService.getToken()}`)
        .then(response => Promise.resolve(response.body));

export const updateStakeholder = (stakeholder) =>
    agent.put(`/rest/v1/stakeholders`, stakeholder)
        .set("Authorization", `Bearer ${AuthService.getToken()}`)
        .then(response => Promise.resolve(response.body));

export const search = (search) =>
    agent.get(`/rest/v1/cases?search=${search}`)
        .set("Authorization", `Bearer ${AuthService.getToken()}`)
        .then(response => Promise.resolve(response.body));
