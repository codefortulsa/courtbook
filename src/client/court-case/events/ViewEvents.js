import React from "react";
import {Col, Row, Button} from "react-bootstrap";
import {EventList} from "./EventList";

export const ViewEvents = ({events, navigateEditEvents}) => (
    <div>
        <Row>
            <Col md={6}>
                <h4>Events</h4>
            </Col>
            <Col md={6}>
                <div className="pull-right">
                    <Button onClick={navigateEditEvents} bsStyle="link">Edit</Button>
                </div>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <EventList events={events}/>
            </Col>
        </Row>
    </div>
);

ViewEvents.displayName = "ViewEvents";

ViewEvents.propTypes = {
    events: React.PropTypes.array.isRequired,
    navigateEditEvents: React.PropTypes.func.isRequired
};
