import React from "react";
import {PageHeader, Row, Col} from "react-bootstrap";
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import SearchForm from "./SearchForm";
import {searchCases} from '../store/actions/SearchActions';

const SearchCourtCases = ({handleSubmit}) =>
    <div>
        <PageHeader>Search Cases</PageHeader>
        <Row>
            <Col mdOffset={3} md={6}>
                <SearchForm searchCases={handleSubmit}/>
            </Col>
        </Row>
    </div>;

export default connect()(reduxForm({
    form: "searchCourtCasesForm",
    onSubmit: ({searchTerms}, dispatch) => dispatch(searchCases(searchTerms))
})(SearchCourtCases));
