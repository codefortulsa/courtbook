import React from "react";
import {Row, Col} from "react-bootstrap";
import {Field} from "redux-form";
import {InputFieldGroup} from "./FieldGroup";

const CourtCaseForm = () => (
    <div>
        <Row>
            <Col md={6}>
                <Field name="caseNumber" id="caseNumber" label="Case Number" required={true} component={InputFieldGroup}/>
            </Col>
            <Col md={6}>
                <Field name="party" id="party" label="Party Full Name" required={true} component={InputFieldGroup}/>
            </Col>
        </Row>
    </div>
);

export default CourtCaseForm;
