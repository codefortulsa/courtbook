import {CourtCaseEvent} from "./models";
import {fetchCaseById} from "./court-case";

export const createEventForCourtCaseId = (courtCaseId, courtCaseEvent) =>
    fetchCaseById(courtCaseId).courtCaseEvents().attach(courtCaseEvent);

export const getEventsByCaseId = (courtCaseId) => CourtCaseEvent.where({courtCaseId}).fetchAll();
