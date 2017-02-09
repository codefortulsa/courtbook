export const FETCH_UPCOMING_EVENTS = "FETCH_UPCOMING_EVENTS";
import {getUpcomingEvents} from "../../courtbook-api";

export const fetchUpcomingEvents = () => ({
    type: FETCH_UPCOMING_EVENTS,
    payload: getUpcomingEvents()
});
