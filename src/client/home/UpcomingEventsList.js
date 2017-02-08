import React from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";

const EventHeader = ({event}) =>
    <div>
        <h3>
            Case {event.courtCase.caseNumber}{' '}
            <small>Party {event.courtCase.party}</small>
        </h3>
    </div>;

const EventBody = ({event}) =>
    <div>
        <div>{event.date}</div>
        <div>{event.description}</div>
    </div>;

const UpcomingEventsList = ({events}) =>
    <div>
        <h2>Upcoming Events</h2>
        <ListGroup>
            {events.map(event =>
                <ListGroupItem key={event.id} header={<EventHeader event={event}/>}>
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
