import React from "react";
import {Panel, Row, Col, Button} from "react-bootstrap";
import {navigateViewCourtCase} from "../store/actions/NavigationActions";
import {connect} from "react-redux";

const CourtCaseResult = ({courtCase, navigateViewCourtCase}) =>
    <Panel>
        <Row>
            <Col md={4}>
                <div><strong>Case Number</strong>: {courtCase.caseNumber}</div>
            </Col>
            <Col md={4}>
                <div><strong>Party</strong>: {courtCase.party}</div>
            </Col>
            <Col md={4}>
                <div className="pull-right">
                    <Button bsStyle="link" onClick={navigateViewCourtCase}>View / Edit</Button>
                </div>
            </Col>
        </Row>
    </Panel>;

CourtCaseResult.displayName = "CourtCaseResult";

CourtCaseResult.propTypes = {
    courtCase: React.PropTypes.object.isRequired,
    navigateViewCourtCase: React.PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, {courtCase}) => ({
    navigateViewCourtCase: () => dispatch(navigateViewCourtCase(123))
});

export default connect(undefined, mapDispatchToProps)(CourtCaseResult);
