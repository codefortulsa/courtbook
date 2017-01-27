import React from "react";
import {Field} from "redux-form";
import {Panel, Col, Row} from "react-bootstrap";
import {FieldGroup} from "../FieldGroup";

const EventForm = ({member, index}) => {
    const dateLabel = `Event date ${index + 1}`;
    const descLabel = `Event description ${index + 1}`;

    return (
        <Panel header={`Event ${index + 1}`}>
            <Row>
                <Col md={12}>
                    <Field name={`${member}.date`} id={`${member}.date`} label={dateLabel}
                           placeholder="Date" srOnly={true} required={true} component={FieldGroup}/>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Field name={`${member}.description`} id={`${member}.description`} label={descLabel}
                           placeholder="Description" srOnly={true} required={true} component={FieldGroup}/>
                </Col>
            </Row>
        </Panel>
    );
};

export default EventForm;
