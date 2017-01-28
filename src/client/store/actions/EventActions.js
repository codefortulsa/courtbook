import _ from "lodash";

export const SAVE_EVENTS = "SAVE_EVENTS";

const createNewEvents = (courtCaseId, events) => {
    const newEvents = _.chain(events)
        .compact() // todo: atm adding an event without entering data causes the event to be null
        .filter((event) => !event.id)
        .map(event => _.assign({}, event, {courtCaseId}))
        .value();
    console.info("Need to creating events:", newEvents);
};

const deleteEvents = (events, existingEventIds) => {
    const eventIdsToNotDelete = _.map(events, "id");
    const eventsIdToDelete = _.without(existingEventIds, ...eventIdsToNotDelete);
    console.info("Need to delete events:", eventsIdToDelete);
};

const updateEvents = (events) => {
    const eventsToUpdate = _.filter(events, "id");
    console.info("Need to update events:", eventsToUpdate);
};

export const saveEvents = ({courtCaseId, events, existingEventIds}) => {
    createNewEvents(courtCaseId, events);
    deleteEvents(events, existingEventIds);
    updateEvents(events);
    return {
        type: SAVE_EVENTS
    };
};
