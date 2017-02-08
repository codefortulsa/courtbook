import _ from "lodash";
import React from "react";
import {connect} from "react-redux";
import {Button, ButtonToolbar, Grid} from "react-bootstrap";
import {reduxForm, FieldArray} from "redux-form";
import StakeholdersForm from "./StakeholdersForm";
import {fetchAndSelectCourtCase} from "../../store/actions/CourtCaseActions";
import {saveStakeholders} from "../../store/actions/StakeholderActions";
import {stakeholderValidation} from "./stakeholderValidation";
import {enhanceWithFetchCourtCase} from "../enhanceWithFetchCourtCase";
import {CourtCaseHeader} from "../CourtCaseHeader";

const EditCourtCaseStakeholders = ({fields, caseNumber, party, handleSubmit}) => (
    <Grid fluid>
        <CourtCaseHeader caseNumber={caseNumber} party={party}>
            <ButtonToolbar>
                <Button id="create" bsStyle="primary" onClick={handleSubmit}>Save</Button>
            </ButtonToolbar>
        </CourtCaseHeader>
        <FieldArray name="stakeholders" component={StakeholdersForm}/>
    </Grid>
);

const mapStateToProps = (state) => ({
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
