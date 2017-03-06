import _ from 'lodash';
import {CourtCaseEvent} from "./models";
import {fetchCaseById} from "./court-case";

export const getUpcomingEvents = () =>
    CourtCaseEvent
        .query((qb) => qb
            .limit(25)
            .whereRaw("date >= current_timestamp")
            .whereRaw("date <= (current_timestamp + interval '1 month')")
        )
        .orderBy('date', 'ASC')
        .fetchAll({withRelated: ["courtCase"]});

export const createEvent = (courtCaseEvent) =>
    fetchCaseById(courtCaseEvent.courtCaseId)
        .then(courtCase => courtCase.courtCaseEvents().attach(courtCaseEvent))
        .then(events => events.head());

export const getEventsByCaseId = (courtCaseId) => CourtCaseEvent.where({courtCaseId}).fetchAll();

export const getPastEventsByCaseId = (courtCaseId) => CourtCaseEvent.where({courtCaseId}).query(qb => qb.whereRaw("date < current_timestamp")).orderBy('date', 'DESC').fetchAll();

export const getFutureEventsByCaseId = (courtCaseId) => CourtCaseEvent.where({courtCaseId}).query(qb => qb.whereRaw("date >= current_timestamp")).orderBy('date', 'ASC').fetchAll();

export const getEventById = (id) => CourtCaseEvent.where({id}).fetch();

export const deleteEventById = (courtCaseEventId) => getEventById(courtCaseEventId).then(event => event.destroy());

export const updateEvent = (event) => getEventById(event.id).then(existing => existing.set(event).save());
