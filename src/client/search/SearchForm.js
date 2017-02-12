import React from "react";
import {Field} from "redux-form";
import {connect} from 'react-redux';
import {Button} from "react-bootstrap";
import {InputFieldGroup} from "../court-case/FieldGroup";

const SearchForm = ({searchCases, searchCasesOnEnter}) =>
    <div>
        <Field name="searchTerms" id="searchTerms" label="Search by case number and party"
               onKeyDown={searchCasesOnEnter} component={InputFieldGroup}/>
        <div className="pull-right">
            <Button bsStyle="primary" onClick={searchCases}>Search</Button>
        </div>
    </div>;

SearchForm.propTypes = {
    searchCases: React.PropTypes.func.isRequired,
    searchCasesOnEnter: React.PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, props) => ({
    searchCasesOnEnter: (e) => e.key === "Enter" ? props.searchCases() : undefined
});

export default connect(undefined, mapDispatchToProps)(SearchForm);
