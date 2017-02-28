import React from "react";
import {toDatetime} from "../utils/formatDate";

const UpcomingEvent = ({event}) =>
    <div>
        <div><strong>Case {event.courtCase.caseNumber}</strong></div>
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

export default UpcomingEvent;
