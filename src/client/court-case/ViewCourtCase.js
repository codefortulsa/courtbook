import React from "react";
import {connect} from "react-redux";
import {Grid, Col, Row} from "react-bootstrap";
import {ViewStakeholders} from "./stakeholders/ViewStakeholders";
import {ViewEvents} from "./events/ViewEvents";
import {fetchAndSelectCourtCase} from "../store/actions/CourtCaseActions";
import {enhanceWithFetchCourtCase} from "./enhanceWithFetchCourtCase";
import {navigateEditStakeholders, navigateEditEvents} from "../../client/store/actions/NavigationActions";
import {CourtCaseHeader} from "./CourtCaseHeader";

const ViewCourtCase = ({
    caseNumber,
    party,
    pastEvents,
    futureEvents,
    stakeholders,
    navigateEditStakeholders,
    navigateEditEvents
}) => (
    <Grid fluid>
        <Row>
            <Col md={12}>
                <CourtCaseHeader caseNumber={caseNumber} party={party}/>
            </Col>
        </Row>
        <Row>
            <Col md={6}>
                <ViewStakeholders stakeholders={stakeholders}
                                  navigateEditStakeholders={navigateEditStakeholders}/>
            </Col>
            <Col md={6}>
                <ViewEvents futureEvents={futureEvents} pastEvents={pastEvents}
                            navigateEditEvents={navigateEditEvents}/>
            </Col>
        </Row>
    </Grid>
);

const mapStateToProps = (state) => ({
    caseNumber: state.selectedCase.courtCase.caseNumber,
    party: state.selectedCase.courtCase.party,
    stakeholders: state.selectedCase.stakeholders,
    pastEvents: state.selectedCase.pastEvents,
    futureEvents: state.selectedCase.futureEvents
});

const mapDispatchToProps = (dispatch, {params: {id}}) => ({
    fetchAndSelectCourtCase: (id) => dispatch(fetchAndSelectCourtCase(id)),
    navigateEditStakeholders: () => dispatch(navigateEditStakeholders(id)),
    navigateEditEvents: () => dispatch(navigateEditEvents(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(enhanceWithFetchCourtCase(ViewCourtCase));
