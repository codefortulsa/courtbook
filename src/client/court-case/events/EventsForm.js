import React from "react";
import {Button, Glyphicon, Panel, Row, Col} from "react-bootstrap";
import EventForm from "./EventForm";
import "../../style/styles.less";

const cardSize = {sm: 6, md: 4, lg: 3};

const EventsForm = ({fields}) => (
    <Row>
        {fields.map((field, index) =>
            <Col key={index} {...cardSize}><EventForm member={field} index={index} remove={() => {
                fields.remove(index)
            }}/></Col>
        )}
    </Row>
);

export default EventsForm;
