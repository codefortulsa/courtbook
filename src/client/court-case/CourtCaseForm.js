import React from "react";
import {Row, Col} from "react-bootstrap";
import {Field} from "redux-form";
import {FieldGroup} from "./FieldGroup";

const PersonForm = () => (
    <div>
        <Row>
            <Col md={6}>
                <Field name="caseNumber" id="caseNumber" label="Case Number" required={true} component={FieldGroup}/>
            </Col>
            <Col md={6}>
                <Field name="defendant" id="defendant" label="Defendant Full Name" required={true} component={FieldGroup}/>
            </Col>
        </Row>
    </div>
);

export default PersonForm;
