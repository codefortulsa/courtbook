import React from "react";

const SearchResultsHeader = ({searchResults, searchStatus}) =>
    searchStatus !== "FULFILLED" ? null : <div>Found {searchResults.length} results.</div>;

SearchResultsHeader.displayName = "SearchResultsHeader";

SearchResultsHeader.propTypes = {
    searchResults: React.PropTypes.array.isRequired,
    searchStatus: React.PropTypes.string.isRequired
};

export default SearchResultsHeader;
