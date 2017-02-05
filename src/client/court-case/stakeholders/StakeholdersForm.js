import React from "react";
import {Button, Glyphicon, Row, Col} from "react-bootstrap";
import StakeholderForm from "./StakeholderForm";
import "../../style/styles.less";

const StakeholdersForm = ({fields}) => (
    <div>
        <Row>
            <Col xs={6}>
                <h4>Stakeholders</h4>
            </Col>
            <Col xs={6}>
                <div className="pull-right">
                    <Button onClick={() => fields.insert(0, {})}><Glyphicon glyph="plus"/> Add</Button>
                </div>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                {fields.map((field, index) => <StakeholderForm key={index} member={field} index={index}
                                                               attributes={fields.get(index)}/>)}
            </Col>
        </Row>
    </div>
);

export default StakeholdersForm;
