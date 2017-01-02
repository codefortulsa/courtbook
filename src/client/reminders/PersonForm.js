import React from "react";
import {Row, Col} from "react-bootstrap";
import {Field} from "redux-form";
import {FieldGroup} from "./FieldGroup";

const PersonForm = () => (
    <div>
        <Row>
            <Col md={4}>
                <Field name="name" id="name" label="Full Name" required={true} component={FieldGroup}/>
            </Col>
            <Col md={4}>
                <Field name="phoneNumber" id="phoneNumber" label="Phone Number" required={true} type="tel"
                       component={FieldGroup}/>
            </Col>
            <Col md={4}>
                <Field name="caseNumber" id="caseNumber" label="Case Number" required={true} component={FieldGroup}/>
            </Col>
        </Row>
    </div>
);

export default PersonForm;
