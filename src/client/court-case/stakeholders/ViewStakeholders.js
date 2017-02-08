import React from "react";
import {Col, Row, Button} from "react-bootstrap";
import {StakeholderList} from "./StakeholderList";

export const ViewStakeholders = ({stakeholders, navigateEditStakeholders}) => (
    <div><Row>
        <Col md={6}>
            <h4>Stakeholders</h4>
        </Col>
        <Col md={6}>
            <div className="pull-right">
                <Button onClick={navigateEditStakeholders} bsStyle="link">Edit</Button>
            </div>
        </Col>
    </Row>
        <Row>
            <Col md={12}>
                <StakeholderList stakeholders={stakeholders}/>
            </Col>
        </Row>
    </div>
);

ViewStakeholders.displayName = "ViewStakeholders";

ViewStakeholders.propTypes = {
    stakeholders: React.PropTypes.array.isRequired,
    navigateEditStakeholders: React.PropTypes.func.isRequired
};
