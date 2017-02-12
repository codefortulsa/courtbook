import React from "react";
import SearchResultsHeader from "./SearchResultsHeader";
import SearchPending from "./SearchPending";
import SearchFulfilled from "./SearchFulfilled";
import SearchRejected from "./SearchRejected";

const SearchResults = ({searchResults, searchStatus}) =>
    <div>
        <SearchResultsHeader searchResults={searchResults} searchStatus={searchStatus}/>
        <SearchPending searchStatus={searchStatus}/>
        <SearchRejected searchStatus={searchStatus}/>
        <SearchFulfilled searchResults={searchResults} searchStatus={searchStatus}/>
    </div>;

SearchResults.displayName = "SearchResults";

SearchResults.propTypes = {
    searchResults: React.PropTypes.array.isRequired,
    searchStatus: React.PropTypes.string.isRequired
};

export default SearchResults;
