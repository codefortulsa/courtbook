import React from "react";
import {PageHeader, Breadcrumb, BreadcrumbItem} from "react-bootstrap";

export const CourtCaseHeader = ({caseNumber, party, children}) =>
    <div>
        <PageHeader>Case {caseNumber}{' '}
            <small>Party: {party}</small>
            <div className="pull-right">
                {children}
            </div>
        </PageHeader>
    </div>;

CourtCaseHeader.displayName = "CourtCaseHeader";

CourtCaseHeader.propTypes = {
    caseNumber: React.PropTypes.string.isRequired,
    party: React.PropTypes.string.isRequired,
    buttons: React.PropTypes.element
};
