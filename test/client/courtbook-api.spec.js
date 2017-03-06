import setup from "../setup";
import * as api from "../../src/client/courtbook-api";

describe("courtbook-api", () => {
    const {expect, chance, authToken, nock} = setup();

    it("fetchCourtCaseById", () => {
        const courtCase = chance.courtCase();

        nock('http://localhost/')
            .get(`/rest/v1/cases/${courtCase.id}`)
            .matchHeader('Authorization', `Bearer ${authToken}`)
            .reply(200, courtCase);

        return expect(api.fetchCourtCaseById(courtCase.id))
            .to.eventually.eql(courtCase);
    });

    it("fetchEventsByCourtCaseId", () => {
        const courtCaseId = chance.integer();
        const events = chance.n(chance.event, 3);

        nock('http://localhost/')
            .get(`/rest/v1/cases/${courtCaseId}/events`)
            .matchHeader('Authorization', `Bearer ${authToken}`)
            .reply(200, events);

        return expect(api.fetchEventsByCourtCaseId(courtCaseId))
            .to.eventually.eql(events);
    });

    it("fetchPastEventsByCourtCaseId", () => {
        const courtCaseId = chance.integer();
        const events = chance.n(chance.event, 3);

        nock('http://localhost/')
            .get(`/rest/v1/cases/${courtCaseId}/events/past`)
            .matchHeader('Authorization', `Bearer ${authToken}`)
            .reply(200, events);

        return expect(api.fetchPastEventsByCourtCaseId(courtCaseId))
            .to.eventually.eql(events);
    });

    it("fetchFutureEventsByCourtCaseId", () => {
        const courtCaseId = chance.integer();
        const events = chance.n(chance.event, 3);

        nock('http://localhost/')
            .get(`/rest/v1/cases/${courtCaseId}/events/future`)
            .matchHeader('Authorization', `Bearer ${authToken}`)
            .reply(200, events);

        return expect(api.fetchFutureEventsByCourtCaseId(courtCaseId))
            .to.eventually.eql(events);
    });

    it("fetchStakeholdersByCourtCaseId", () => {
        const courtCaseId = chance.integer();
        const stakeholders = chance.n(chance.stakeholder, 3);

        nock('http://localhost/')
            .get(`/rest/v1/cases/${courtCaseId}/stakeholders`)
            .matchHeader('Authorization', `Bearer ${authToken}`)
            .reply(200, stakeholders);

        return expect(api.fetchStakeholdersByCourtCaseId(courtCaseId))
            .to.eventually.eql(stakeholders);
    });

    it("createCase", () => {
        const courtCase = chance.courtCase();

        nock('http://localhost/')
            .post(`/rest/v1/cases`, courtCase)
            .matchHeader('Authorization', `Bearer ${authToken}`)
            .reply(200, courtCase);

        return expect(api.createCase(courtCase))
            .to.eventually.eql(courtCase);
    });

    it("search", () => {
        const searchTerms = chance.word();
        const courtCases = chance.n(chance.courtCase, 3);

        nock('http://localhost/')
            .get(`/rest/v1/cases?search=${searchTerms}`)
            .matchHeader('Authorization', `Bearer ${authToken}`)
            .reply(200, courtCases);

        return expect(api.search(searchTerms))
            .to.eventually.eql(courtCases);
    });

    it("createEvent", () => {
        const event = chance.event();

        nock('http://localhost/')
            .post(`/rest/v1/events`, event)
            .matchHeader('Authorization', `Bearer ${authToken}`)
            .reply(200, event);

        return expect(api.createEvent(event))
            .to.eventually.eql(event);
    });

    it("updateEvent", () => {
        const event = chance.event();

        nock('http://localhost/')
            .put(`/rest/v1/events`, event)
            .matchHeader('Authorization', `Bearer ${authToken}`)
            .reply(200, event);

        return expect(api.updateEvent(event))
            .to.eventually.eql(event);
    });

    it("getUpcomingEvents", () => {
        const events = chance.n(chance.event, 3);

        nock('http://localhost/')
            .get(`/rest/v1/events/upcoming`)
            .matchHeader('Authorization', `Bearer ${authToken}`)
            .reply(200, events);

        return expect(api.getUpcomingEvents())
            .to.eventually.eql(events);
    });

    it("deleteEventById", () => {
        const eventId = chance.integer();

        nock('http://localhost/')
            .delete(`/rest/v1/events/${eventId}`)
            .matchHeader('Authorization', `Bearer ${authToken}`)
            .reply(200, "OK");

        return expect(api.deleteEventById(eventId))
            .to.eventually.eql(eventId);
    });

    it("createStakeholder", () => {
        const stakeholder = chance.stakeholder();

        nock('http://localhost/')
            .post(`/rest/v1/stakeholders`, stakeholder)
            .matchHeader('Authorization', `Bearer ${authToken}`)
            .reply(200, stakeholder);

        return expect(api.createStakeholder(stakeholder))
            .to.eventually.eql(stakeholder);
    });

    it("updateStakeholder", () => {
        const stakeholder = chance.stakeholder();

        nock('http://localhost/')
            .put(`/rest/v1/stakeholders`, stakeholder)
            .matchHeader('Authorization', `Bearer ${authToken}`)
            .reply(200, stakeholder);

        return expect(api.updateStakeholder(stakeholder))
            .to.eventually.eql(stakeholder);
    });

    it("deleteStakeholderById", () => {
        const stakeholderId = chance.integer();

        nock('http://localhost/')
            .delete(`/rest/v1/stakeholders/${stakeholderId}`)
            .matchHeader('Authorization', `Bearer ${authToken}`)
            .reply(200, "OK");

        return expect(api.deleteStakeholderById(stakeholderId))
            .to.eventually.eql(stakeholderId);
    });
});
