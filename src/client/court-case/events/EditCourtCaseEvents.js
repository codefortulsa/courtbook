import _ from "lodash";
import React from "react";
import {connect} from "react-redux";
import {Button, ButtonToolbar, Grid} from "react-bootstrap";
import {reduxForm, FieldArray} from "redux-form";
import EventsForm from "./EventsForm";
import {fetchAndSelectCourtCase} from "../../store/actions/CourtCaseActions";
import {saveEvents} from "../../store/actions/EventActions";
import {eventValidation} from "./eventValidation";
import {CourtCaseHeader} from "../CourtCaseHeader";
import {enhanceWithFetchCourtCase} from "../enhanceWithFetchCourtCase";

const EditCourtCaseEvents = ({caseNumber, defendant, handleSubmit}) => (
    <Grid fluid>
        <div>
            <CourtCaseHeader caseNumber={caseNumber} defendant={defendant}>
                <ButtonToolbar>
                    <Button id="create" bsStyle="primary" onClick={handleSubmit}>Save</Button>
                </ButtonToolbar>
            </CourtCaseHeader>
        </div>
        <FieldArray name="events" component={EventsForm}/>
    </Grid>
);

const mapStateToProps = (state) => ({
    caseNumber: state.selectedCase.courtCase.caseNumber,
    defendant: state.selectedCase.courtCase.defendant,
    initialValues: {
        existingEventIds: _.map(state.selectedCase.events, "id"),
        courtCaseId: state.selectedCase.courtCase.id,
        events: state.selectedCase.events
    }
});

export default connect(mapStateToProps, {fetchAndSelectCourtCase, saveEvents})(reduxForm({
    form: "editCourtCaseEventsForm",
    onSubmit: saveEvents,
    enableReinitialize: true,
    validate: eventValidation
})(enhanceWithFetchCourtCase(EditCourtCaseEvents)));
