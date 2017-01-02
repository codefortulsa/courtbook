import React from "react";
import {Field} from "redux-form";
import {Col, Row} from "react-bootstrap";
import {FieldGroup} from "./FieldGroup";

const RemindersForm = () => (
    <Row>
        <Col md={2}>
            <Field name="date" id="date" label="Date" required={true} component={FieldGroup}/>
        </Col>
        <Col md={10}>
            <Field name="description" id="description" label="Description" required={true} component={FieldGroup}/>
        </Col>
    </Row>
);

export default RemindersForm;
