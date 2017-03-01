import React from "react";
import {connect} from "react-redux";
import {Breadcrumb, BreadcrumbItem} from "react-bootstrap";
import {navigateHome, navigateViewCourtCase} from "../../store/actions/NavigationActions";

const EditCourtCaseEvents = ({caseNumber, party, navigateHome, navigateViewCourtCase}) =>
    <Breadcrumb>
        <BreadcrumbItem id="breadcrumb-home" onClick={navigateHome}>Home</BreadcrumbItem>
        <BreadcrumbItem id="breadcrumb-case" onClick={navigateViewCourtCase}><span>Case Number {caseNumber} ({party})</span></BreadcrumbItem>
        <BreadcrumbItem id="breadcrumb-edit-events" active><span>Edit Events</span></BreadcrumbItem>
    </Breadcrumb>;

EditCourtCaseEvents.displayName = "EditCourtCaseEvents";

EditCourtCaseEvents.propTypes = {
    caseId: React.PropTypes.string.isRequired,
    caseNumber: React.PropTypes.string.isRequired,
    party: React.PropTypes.string.isRequired,
    navigateHome: React.PropTypes.func.isRequired,
    navigateViewCourtCase: React.PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, {caseId}) => ({
    navigateHome: () => dispatch(navigateHome()),
    navigateViewCourtCase: () => dispatch(navigateViewCourtCase(caseId))
});

export default connect(undefined, mapDispatchToProps)(EditCourtCaseEvents);
