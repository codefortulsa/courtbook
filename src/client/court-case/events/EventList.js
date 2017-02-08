import React from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";

const noEvents = <div>There are currently no events.</div>;

export const EventList = ({events}) => {
    const eventListGroup =
        <ListGroup>
            {events.map(event =>
                <ListGroupItem key={event.id} header={event.date}>{event.description}</ListGroupItem>
            )}
        </ListGroup>;
    return events.length ? eventListGroup : noEvents;
};

EventList.displayName = "EventList";

EventList.propTypes = {
    events: React.PropTypes.array.isRequired
};
