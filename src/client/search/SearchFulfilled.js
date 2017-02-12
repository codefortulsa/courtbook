import React from "react";
import CourtCaseResult from "./CourtCaseResult";

const SearchFulfilled = ({searchResults}) =>
    <div>
        {searchResults.map(result => <CourtCaseResult key={result.id} courtCase={result}/>)}
    </div>;

SearchFulfilled.displayName = "SearchFulfilled";

SearchFulfilled.propTypes = {
    searchResults: React.PropTypes.array.isRequired
};

export default SearchFulfilled;
