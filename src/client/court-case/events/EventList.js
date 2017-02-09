import React from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {toDatetime} from "../../utils/formatDate";

const noEvents = <div>There are currently no events.</div>;

export const EventList = ({events}) => {
    const eventListGroup =
        <ListGroup>
            {events.map(event =>
                <ListGroupItem key={event.id} header={toDatetime(event.date)}>{event.description}</ListGroupItem>
            )}
        </ListGroup>;
    return events.length ? eventListGroup : noEvents;
};

EventList.displayName = "EventList";

EventList.propTypes = {
    events: React.PropTypes.array.isRequired
};
