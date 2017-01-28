import React from "react";
import {connect} from "react-redux";
import {PageHeader, Button, Grid} from "react-bootstrap";
import {reduxForm} from "redux-form";
import CourtCaseForm from "./CourtCaseForm";
import {createCourtCase} from "../store/actions/CourtCaseActions";

const CreateCourtCases = ({handleSubmit}) => (
    <Grid fluid>
        <PageHeader>Add a Court Case</PageHeader>
        <CourtCaseForm/>
        <div style={{overflow: "auto"}}>
            <div className="pull-right">
                <Button id="create" bsStyle="primary" onClick={handleSubmit}>Create</Button>
            </div>
        </div>
    </Grid>
);

export default connect(undefined, {onSubmit: createCourtCase})(reduxForm({
    form: "courtCasesForm"
})(CreateCourtCases));
