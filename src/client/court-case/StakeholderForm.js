import React from "react";
import {Field} from "redux-form";
import {Col, Row} from "react-bootstrap";
import {FieldGroup} from "./FieldGroup";

const StakeholderForm = ({member, index}) => {
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
                <Field name={`${member}.name`} id={`${member}.name`} label={nameLabel}
                       placeholder="Name" srOnly={true} required={true} component={FieldGroup}/>
            </Col>
            <Col md={6}>
                <Field name={`${member}.phoneNumber`} id={`${member}.phoneNumber`} label={phoneNumberLabel}
                       placeholder="Cell Number" srOnly={true} required={true} component={FieldGroup}/>
            </Col>
        </Row>
    );
};

export default StakeholderForm;
