import React from "react";
import {connect} from "react-redux";
import {PageHeader, Button, Grid, Row, Col} from "react-bootstrap";
import {reduxForm, FieldArray} from "redux-form";
import CourtCaseForm from "./CourtCaseForm";
import EventsForm from "./EventsForm";
import StakeholdersForm from "./StakeholdersForm";
import {COURT_CASE_FORM_NAME, createCourtCase} from "../store/actions/CourtCaseActions";

const CreateCourtCases = ({handleSubmit}) => (
    <Grid fluid>
        <PageHeader>Create Court Case</PageHeader>
        <CourtCaseForm/>
        <Row>
            <Col md={6}>
                <FieldArray name="courtCases" component={EventsForm}/>
            </Col>
            <Col md={6}>
                <FieldArray name="stakeholders" component={StakeholdersForm}/>
            </Col>
        </Row>
        <div style={{overflow: "auto"}}>
            <div className="pull-right">
                <Button id="create" bsStyle="primary" onClick={handleSubmit}>Create</Button>
            </div>
        </div>
    </Grid>
);

export default connect(undefined, {onSubmit: createCourtCase})(reduxForm({
    form: COURT_CASE_FORM_NAME
})(CreateCourtCases));
