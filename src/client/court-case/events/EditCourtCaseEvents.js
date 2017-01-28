import _ from "lodash";
import React from "react";
import {connect} from "react-redux";
import {PageHeader, Button, ButtonToolbar, Grid} from "react-bootstrap";
import {reduxForm, FieldArray} from "redux-form";
import EventsForm from "./EventsForm";
import {fetchAndSelectCourtCase} from "../../store/actions/CourtCaseActions";
import {saveEvents} from "../../store/actions/EventActions";
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
        <FieldArray name="events" component={EventsForm}/>
    </Grid>
);

const mapStateToProps = (state, x, y) => ({
    caseNumber: state.selectedCase.courtCase.caseNumber,
    defendant: state.selectedCase.courtCase.defendant,
    initialValues: {
        existingEventIds: _.map(state.selectedCase.events, "id"),
        courtCaseId: state.selectedCase.courtCase.id,
        events: state.selectedCase.events
    }
});

export default connect(mapStateToProps, {fetchAndSelectCourtCase})(reduxForm({
    form: "editCourtCaseEventsForm",
    onSubmit: saveEvents,
    enableReinitialize: true
})(enhance(EditCourtCaseEvents)));
