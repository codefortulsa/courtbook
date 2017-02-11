import React from "react";
import {Field} from "redux-form";
import {Button} from "react-bootstrap";
import {InputFieldGroup} from "../court-case/FieldGroup";

const SearchForm = ({searchCases}) =>
    <div>
        <Field name="searchTerms" id="searchTerms" label="Search by case number and party" component={InputFieldGroup}/>
        <div className="pull-right">
            <Button bsStyle="primary" onClick={searchCases}>Search</Button>
        </div>
    </div>;

SearchForm.propTypes = {
    searchCases: React.PropTypes.func.isRequired
};

export default SearchForm;
