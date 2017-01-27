import React from "react";
import {Field} from "redux-form";
import {Col, Row} from "react-bootstrap";
import {FieldGroup} from "./FieldGroup";

const EventForm = ({member, index}) => {
    const dateLabel = `Event date ${index + 1}`;
    const descLabel = `Event description ${index + 1}`;

    return (
        <Row>
            <Col md={3}>
                <div className="form-control-static">
                    <label>Event {index + 1}</label>
                </div>
            </Col>
            <Col md={3}>
                <Field name={`${member}.date`} id={`${member}.date`} label={dateLabel}
                       placeholder="Date" srOnly={true} required={true} component={FieldGroup}/>
            </Col>
            <Col md={6}>
                <Field name={`${member}.description`} id={`${member}.description`} label={descLabel}
                       placeholder="Description" srOnly={true} required={true} component={FieldGroup}/>
            </Col>
        </Row>
    );
};

export default EventForm;
