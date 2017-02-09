import React from "react";
import {Field} from "redux-form";
import {Col, Row} from "react-bootstrap";
import {InputFieldGroup} from "../FieldGroup";

const StakeholderForm = ({member, index, attributes}) => {
    const disableEditing = !!attributes.id; // Disable editing existing stakeholder contact information
    const nameLabel = `Stakeholder Name ${index + 1}`;
    const phoneNumberLabel = `Stakeholder Cell Number ${index + 1}`;

    return (
        <Row>
            <Col md={3}>
                <div className="form-control-static">
                    <label>Stakeholder {index + 1}</label>
                </div>
            </Col>
            <Col md={3}>
                <Field name={`${member}.name`} id={`${member}.name`} label={nameLabel} disabled={disableEditing}
                       placeholder="Name" srOnly={true} required={true} component={InputFieldGroup}/>
            </Col>
            <Col md={6}>
                <Field name={`${member}.contact`} id={`${member}.contact`} label={phoneNumberLabel}
                       disabled={disableEditing} placeholder="Cell Number" srOnly={true} required={true}
                       component={InputFieldGroup}/>
            </Col>
        </Row>
    );
};

export default StakeholderForm;
