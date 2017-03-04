import React from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import UpcomingEvent from "./UpcomingEvent";

const UpcomingEventsList = ({events}) =>
    <div>
        <h2>Upcoming Events</h2>
        <ListGroup>
            {events.map(event =>
                <ListGroupItem key={event.id}>
                    <UpcomingEvent event={event}/>
                </ListGroupItem>)
            }
        </ListGroup>

    </div>;

UpcomingEventsList.displayName = "UpcomingEventsListEvents";

UpcomingEventsList.propTypes = {
    events: React.PropTypes.array
};

export default UpcomingEventsList;
