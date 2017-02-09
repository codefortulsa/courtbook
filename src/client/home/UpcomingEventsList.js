import React from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {toDatetime} from "../utils/formatDate";

const EventBody = ({event}) =>
    <div>
        <div><strong>Case {event.courtCase.caseNumber}</strong></div>
        <div>Party: {event.courtCase.party}</div>
        <div>Date: {toDatetime(event.date)}</div>
        <div>Description: {event.description}</div>
    </div>;

const UpcomingEventsList = ({events}) =>
    <div>
        <h2>Upcoming Events</h2>
        <ListGroup>
            {events.map(event =>
                <ListGroupItem key={event.id}>
                    <EventBody event={event}/>
                </ListGroupItem>)
            }
        </ListGroup>

    </div>;

UpcomingEventsList.displayName = "UpcomingEventsListEvents";

UpcomingEventsList.propTypes = {
    events: React.PropTypes.array
};

export default UpcomingEventsList;
