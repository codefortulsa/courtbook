import React from "react";
import {PageHeader} from "react-bootstrap";

export const CourtCaseHeader = ({caseNumber, party, children}) =>
    <PageHeader>Case {caseNumber}{' '}
        <small>Party: {party}</small>
        <div className="pull-right">
            {children}
        </div>
    </PageHeader>;

CourtCaseHeader.displayName = "CourtCaseHeader";

CourtCaseHeader.propTypes = {
    caseNumber: React.PropTypes.string.isRequired,
    party: React.PropTypes.string.isRequired,
    buttons: React.PropTypes.element
};
