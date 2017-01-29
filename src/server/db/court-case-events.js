import {CourtCaseEvent} from "./models";
import {fetchCaseById} from "./court-case";

export const createEvent = (courtCaseEvent) =>
    fetchCaseById(courtCaseEvent.courtCaseId).then(courtCase => courtCase.courtCaseEvents().attach(courtCaseEvent));

export const getEventsByCaseId = (courtCaseId) => CourtCaseEvent.where({courtCaseId}).fetchAll();

export const getEventById = (id) => CourtCaseEvent.where({id}).fetch();

export const deleteEventById = (courtCaseEventId) => getEventById(courtCaseEventId).then(event => event.destroy());

export const updateEvent = (event) => getEventById(event.id).then(existing => existing.set(event).save());
