import _ from "lodash";
import {navigateViewCourtCase} from "./NavigationActions";
import {deleteEventById, updateEvent, createEvent} from "../../courtbook-api";
import {arrayUnshift} from "redux-form";

export const SAVE_EVENTS = "SAVE_EVENTS";

const createNewEvents = (courtCaseId, events) => {
    const newEvents = _.chain(events)
        .filter((event) => !event.id)
        .map(event => _.assign({}, event, {courtCaseId}))
        .value();
    return Promise.all(_.map(newEvents, createEvent));
};

const deleteEvents = (events, existingEventIds) => {
    const eventIdsToNotDelete = _.map(events, "id");
    const eventsIdToDelete = _.without(existingEventIds, ...eventIdsToNotDelete);
    return Promise.all(_.map(eventsIdToDelete, deleteEventById));
};

const updateEvents = (events) => {
    const eventsToUpdate = _.filter(events, "id");
    return Promise.all(_.map(eventsToUpdate, updateEvent));
};

export const saveEvents = ({courtCaseId, events, existingEventIds}, dispatch) => ({
    type: SAVE_EVENTS,
    payload: Promise.all([
        createNewEvents(courtCaseId, events),
        deleteEvents(events, existingEventIds),
        updateEvents(events)
    ]).then(() => dispatch(navigateViewCourtCase(courtCaseId)))
});

export const addEvent = (formName) => () => arrayUnshift(formName, "events", {date: new Date(), description: ""});
