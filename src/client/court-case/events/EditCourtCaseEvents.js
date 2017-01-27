import React from "react";
import {connect} from "react-redux";
import {PageHeader, Button, Grid} from "react-bootstrap";
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

const EditCourtCaseEvents = ({caseNumber, defendant, handleSubmit}) => (
    <Grid fluid>
        <PageHeader>Edit Court Case Events
            <small>Case: {caseNumber} &bull; Defendant {defendant}</small>
        </PageHeader>
        <FieldArray name="courtCases" component={EventsForm}/>
        <div style={{overflow: "auto"}}>
            <div className="pull-right">
                <Button id="create" bsStyle="primary" onClick={handleSubmit}>Save</Button>
            </div>
        </div>
    </Grid>
);

const mapStateToProps = (state) => ({
    caseNumber: state.selectedCase.courtCase.caseNumber,
    defendant: state.selectedCase.courtCase.defendant
});

export default connect(mapStateToProps, {onSubmit: editCourtCaseEvents, fetchAndSelectCourtCase})(reduxForm({
    form: "editCourtCaseEventsForm"
})(enhance(EditCourtCaseEvents)));
