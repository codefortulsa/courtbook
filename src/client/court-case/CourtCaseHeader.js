import React from "react";
import {PageHeader} from "react-bootstrap";

export const CourtCaseHeader = ({caseNumber, defendant, children}) =>
    <PageHeader>Case {caseNumber}{' '}
        <small>Defendant: {defendant}</small>
        <div className="pull-right">
            {children}
        </div>
    </PageHeader>;

CourtCaseHeader.displayName = "CourtCaseHeader";

CourtCaseHeader.propTypes = {
    caseNumber: React.PropTypes.string,
    defendant: React.PropTypes.string,
    buttons: React.PropTypes.element
};
