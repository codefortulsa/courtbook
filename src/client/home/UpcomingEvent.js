import React from "react";
import {connect} from "react-redux";
import {Glyphicon} from "react-bootstrap";
import {navigateViewCourtCase} from "../store/actions/NavigationActions";
import {toDatetime} from "../utils/formatDate";

const UpcomingEvent = ({event, navigateViewCourtCase}) =>
    <div>
        <div>
            <strong>Case {event.courtCase.caseNumber}</strong>
            <Glyphicon id="view-case" className="pull-right link" glyph="edit" onClick={navigateViewCourtCase}/>
        </div>
        <div>Party: {event.courtCase.party}</div>
        <div>Date: {toDatetime(event.date)}</div>
        <div>Description: {event.description}</div>
    </div>;

UpcomingEvent.displayname = "UpcomingEvent";

UpcomingEvent.propTypes = {
    event: React.PropTypes.shape({
        date: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        courtCase: React.PropTypes.shape({
            caseNumber: React.PropTypes.string.isRequired,
            party: React.PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

const mapDispatchToProps = (dispatch, {event: {courtCaseId}}) => ({
    navigateViewCourtCase: () => dispatch(navigateViewCourtCase(courtCaseId))
});

export default connect(undefined, mapDispatchToProps)(UpcomingEvent);
