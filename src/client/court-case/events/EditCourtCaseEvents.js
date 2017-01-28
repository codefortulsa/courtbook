import React from "react";
import {connect} from "react-redux";
import {PageHeader, Button, ButtonToolbar, Grid, Glyphicon} from "react-bootstrap";
import {reduxForm, FieldArray} from "redux-form";
import EventsForm from "./EventsForm";
import {editCourtCaseEvents, fetchAndSelectCourtCase} from "../../store/actions/CourtCaseActions";
import {compose, lifecycle} from "recompose";

const enhance = compose(
    lifecycle({
        componentDidMount: function () {
            const {fetchAndSelectCourtCase, params: {id}} = this.props;
            fetchAndSelectCourtCase(id);
        }
    }));

const EditCourtCaseEvents = ({fields, caseNumber, defendant, handleSubmit}) => (
    <Grid fluid>
        <div>
            <PageHeader>Case {caseNumber} Events{' '}
                <small>Defendant: {defendant}</small>
                <div className="pull-right">
                    <ButtonToolbar>
                        <Button id="create" bsStyle="primary" onClick={handleSubmit}>Save</Button>
                    </ButtonToolbar>
                </div>
            </PageHeader>
        </div>
        <FieldArray name="courtCases" component={EventsForm}/>
    </Grid>
);

const mapStateToProps = (state) => ({
    caseNumber: state.selectedCase.courtCase.caseNumber,
    defendant: state.selectedCase.courtCase.defendant
});

export default connect(mapStateToProps, {fetchAndSelectCourtCase})(reduxForm({
    form: "editCourtCaseEventsForm",
    onSubmit: editCourtCaseEvents
})(enhance(EditCourtCaseEvents)));
