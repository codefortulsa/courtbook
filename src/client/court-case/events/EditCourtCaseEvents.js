import _ from "lodash";
import React from "react";
import {connect} from "react-redux";
import {Button, ButtonToolbar, Grid, PageHeader, Glyphicon} from "react-bootstrap";
import {reduxForm, FieldArray} from "redux-form";
import EventsForm from "./EventsForm";
import CourtCaseBreadcrumbs from "../CourtCaseBreadcrumbs";
import {fetchAndSelectCourtCase} from "../../store/actions/CourtCaseActions";
import {saveEvents, addEvent} from "../../store/actions/EventActions";
import {eventValidation} from "./eventValidation";
import {enhanceWithFetchCourtCase} from "../enhanceWithFetchCourtCase";

const formName = "editCourtCaseEventsForm";

const EditCourtCaseEvents = ({caseId, caseNumber, party, handleSubmit, addEvent}) => {
    if (caseNumber && party) {
        return (
            <Grid fluid>
                <CourtCaseBreadcrumbs caseId={caseId} caseNumber={caseNumber} party={party}
                                      activeBreadcrumbText="Edit Events"/>
                <PageHeader>Edit Events{' '}
                    <small>Case {caseNumber} ({party})</small>
                    <div className="pull-right">
                        <ButtonToolbar>
                            <Button onClick={addEvent}><Glyphicon glyph="plus"/> Add</Button>
                            <Button id="create" bsStyle="primary" onClick={handleSubmit}>Save</Button>
                        </ButtonToolbar>
                    </div>
                </PageHeader>
                <FieldArray name="events" component={EventsForm}/>
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
        existingEventIds: _.map(state.selectedCase.events, "id"),
        courtCaseId: state.selectedCase.courtCase.id,
        events: state.selectedCase.events
    }
});

export default connect(mapStateToProps, {fetchAndSelectCourtCase, saveEvents, addEvent: addEvent(formName)})(reduxForm({
    form: formName,
    onSubmit: saveEvents,
    enableReinitialize: true,
    validate: eventValidation
})(enhanceWithFetchCourtCase(EditCourtCaseEvents)));
