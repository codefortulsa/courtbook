import _ from "lodash";
import React from "react";
import {connect} from "react-redux";
import {PageHeader, Button, ButtonToolbar, Grid} from "react-bootstrap";
import {reduxForm, FieldArray} from "redux-form";
import StakeholdersForm from "./StakeholdersForm";
import {fetchAndSelectCourtCase} from "../../store/actions/CourtCaseActions";
import {saveStakeholders} from "../../store/actions/StakeholderActions";
import {compose, lifecycle} from "recompose";
import {stakeholderValidation} from './stakeholderValidation';

const enhance = compose(
    lifecycle({
        componentDidMount: function () {
            const {fetchAndSelectCourtCase, params: {id}} = this.props;
            fetchAndSelectCourtCase(id);
        }
    }));

const EditCourtCaseStakeholders = ({fields, caseNumber, defendant, handleSubmit}) => (
    <Grid fluid>
        <div>
            <PageHeader>Stakeholders{' '}
                <small>Case: {caseNumber} &bull; Defendant: {defendant}</small>
                <div className="pull-right">
                    <ButtonToolbar>
                        <Button id="create" bsStyle="primary" onClick={handleSubmit}>Save</Button>
                    </ButtonToolbar>
                </div>
            </PageHeader>
        </div>
        <FieldArray name="stakeholders" component={StakeholdersForm}/>
    </Grid>
);

const mapStateToProps = (state, x, y) => ({
    caseNumber: state.selectedCase.courtCase.caseNumber,
    defendant: state.selectedCase.courtCase.defendant,
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
})(enhance(EditCourtCaseStakeholders)));
