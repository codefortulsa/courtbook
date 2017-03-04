import _ from "lodash";
import React from "react";
import {connect} from "react-redux";
import {Button, ButtonToolbar, Grid, PageHeader} from "react-bootstrap";
import {reduxForm, FieldArray} from "redux-form";
import StakeholdersForm from "./StakeholdersForm";
import CourtCaseBreadcrumbs from "../CourtCaseBreadcrumbs";
import {fetchAndSelectCourtCase} from "../../store/actions/CourtCaseActions";
import {saveStakeholders} from "../../store/actions/StakeholderActions";
import {stakeholderValidation} from "./stakeholderValidation";
import {enhanceWithFetchCourtCase} from "../enhanceWithFetchCourtCase";

const EditCourtCaseStakeholders = ({caseId, caseNumber, party, handleSubmit}) => {
    if (caseNumber && party) {
        return (
            <Grid fluid>
                <CourtCaseBreadcrumbs caseId={caseId} caseNumber={caseNumber} party={party} activeBreadcrumbText="Edit Stakeholders"/>
                <PageHeader>Edit Stakeholders{' '}
                    <small>Case {caseNumber} ({party})</small>
                    <div className="pull-right">
                        <ButtonToolbar>
                            <Button id="create" bsStyle="primary" onClick={handleSubmit}>Save</Button>
                        </ButtonToolbar>
                    </div>
                </PageHeader>
                <FieldArray name="stakeholders" component={StakeholdersForm}/>
            </Grid>
        );
    } else {
        return (
            <div>Loading...</div>
        );
    }
};

const mapStateToProps = (state) => ({
    caseId: state.selectedCase.courtCase.id,
    caseNumber: state.selectedCase.courtCase.caseNumber,
    party: state.selectedCase.courtCase.party,
    initialValues: {
        existingStakeholderIds: _.map(state.selectedCase.stakeholders, "id"),
        courtCaseId: state.selectedCase.courtCase.id,
        stakeholders: state.selectedCase.stakeholders
    }
});

export default connect(mapStateToProps, {fetchAndSelectCourtCase})(reduxForm({
    form: "editStakeholdersForm",
    onSubmit: saveStakeholders,
    enableReinitialize: true,
    validate: stakeholderValidation
})(enhanceWithFetchCourtCase(EditCourtCaseStakeholders)));
