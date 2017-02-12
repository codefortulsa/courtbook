import React from "react";
import {PageHeader, Row, Col} from "react-bootstrap";
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import {searchCases} from '../store/actions/SearchActions';

const SearchCourtCases = ({handleSubmit, searchResults, searchStatus}) =>
    <div>
        <PageHeader>Search Cases</PageHeader>
        <Row>
            <Col mdOffset={3} md={6}>
                <SearchForm searchCases={handleSubmit}/>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <SearchResults searchStatus={searchStatus} searchResults={searchResults}/>
            </Col>
        </Row>
    </div>;

SearchCourtCases.displayName = "SearchCourtCases";

SearchCourtCases.propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    searchResults: React.PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    searchResults: state.searchCourtCases.searchResults,
    searchStatus: state.searchCourtCases.searchStatus,
    initialValues: {
        searchTerms: state.searchCourtCases.searchTerms
    }
});

export default connect(mapStateToProps)(reduxForm({
    form: "searchCourtCasesForm",
    enableReinitialize: true,
    onSubmit: ({searchTerms}, dispatch) => dispatch(searchCases(searchTerms))
})(SearchCourtCases));
