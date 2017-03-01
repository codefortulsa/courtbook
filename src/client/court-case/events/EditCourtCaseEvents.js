import _ from "lodash";
import React from "react";
import {connect} from "react-redux";
import {Button, ButtonToolbar, Grid, PageHeader} from "react-bootstrap";
import {reduxForm, FieldArray} from "redux-form";
import EventsForm from "./EventsForm";
import EditEventsBreadcrumbs from "./EditEventsBreadcrumbs";
import {fetchAndSelectCourtCase} from "../../store/actions/CourtCaseActions";
import {saveEvents} from "../../store/actions/EventActions";
import {eventValidation} from "./eventValidation";
import {enhanceWithFetchCourtCase} from "../enhanceWithFetchCourtCase";

const EditCourtCaseEvents = ({caseId, caseNumber, party, handleSubmit}) => {
    if (caseNumber && party) {
        return (
            <Grid fluid>
                <div>
                    <EditEventsBreadcrumbs caseId={caseId} caseNumber={caseNumber} party={party}/>
                    <div>
                        <PageHeader>Edit Events{' '}
                            <small>Case {caseNumber} ({party})</small>
                            <div className="pull-right">
                                <ButtonToolbar>
                                    <Button id="create" bsStyle="primary" onClick={handleSubmit}>Save</Button>
                                </ButtonToolbar>
                            </div>
                        </PageHeader>
                    </div>
                </div>
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

export default connect(mapStateToProps, {fetchAndSelectCourtCase, saveEvents})(reduxForm({
    form: "editCourtCaseEventsForm",
    onSubmit: saveEvents,
    enableReinitialize: true,
    validate: eventValidation
})(enhanceWithFetchCourtCase(EditCourtCaseEvents)));
