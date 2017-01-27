import React from "react";
import {Button, Glyphicon, Row, Col} from "react-bootstrap";
import EventForm from "./EventForm";
import "../../style/styles.less";

const EventsForm = ({fields}) => (
    <div>
        <Row>
            <Col xs={6}>
                <h4>Case Events</h4>
            </Col>
            <Col xs={6}>
                <div className="pull-right">
                    <Button onClick={() => fields.push()}><Glyphicon glyph="plus"/> Add</Button>
                </div>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                {fields.map((field, index) => <EventForm key={index} member={field} index={index}/>)}
            </Col>
        </Row>
    </div>
);

export default EventsForm;
