import React from "react";
import {connect} from "react-redux";
import {PageHeader, Grid, Col, Row} from "react-bootstrap";
import {ViewStakeholders} from './stakeholders/ViewStakeholders';
import {fetchAndSelectCourtCase} from "../store/actions/CourtCaseActions";
import {enhanceWithFetchCourtCase} from "./enhanceWithFetchCourtCase";
import {navigateEditStakeholders} from '../../client/store/actions/NavigationActions';

const ViewCourtCase = ({caseNumber, defendant, events, stakeholders, navigateEditStakeholders}) => (
    <Grid fluid>
        <Row>
            <Col md={12}>
                <PageHeader>Court case {caseNumber}{' '}
                    <small>Defendant: {defendant}</small>
                </PageHeader>
            </Col>
        </Row>
        <Row>
            <Col md={6}>
                {/*<ViewEvents events={events}/>*/}
            </Col>
            <Col md={6}>
                <ViewStakeholders stakeholders={stakeholders}
                                  navigateEditStakeholders={navigateEditStakeholders}/>
            </Col>
        </Row>
    </Grid>
);

const mapStateToProps = (state) => ({
    caseNumber: state.selectedCase.courtCase.caseNumber,
    defendant: state.selectedCase.courtCase.defendant,
    stakeholders: state.selectedCase.stakeholders,
    events: state.selectedCase.events
});

const mapDispatchToProps = (dispatch, {params: {id}}) => ({
    fetchAndSelectCourtCase: (id) => dispatch(fetchAndSelectCourtCase(id)),
    navigateEditStakeholders: () => dispatch(navigateEditStakeholders(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(enhanceWithFetchCourtCase(ViewCourtCase));