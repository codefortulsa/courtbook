import React from "react";
import {connect} from "react-redux";
import {PageHeader} from "react-bootstrap";
import {compose, lifecycle} from "recompose";
import {fetchCourtCase} from '../store/actions/CourtCaseActions';

function componentDidMount() {

}

const enhance = compose(
    lifecycle({
        componentDidMount: function() {
            const {fetchCourtCase, params: {personId}} = this.props;
            fetchCourtCase(personId);
        }
    }));

const ViewCourtCases = enhance(() => (
    <div>
        <PageHeader>Viewing CourtCases for</PageHeader>
    </div>
));

const stateToProps = (state) => ({});

export default connect(stateToProps, {fetchCourtCase})(ViewCourtCases);
