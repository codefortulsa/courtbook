import React from "react";

const SearchRejected = ({searchStatus}) =>
    searchStatus !== "REJECTED" ? null : <div>Search failed. :-(</div>;

SearchRejected.displayName = "SearchRejected";

SearchRejected.propTypes = {
    searchStatus: React.PropTypes.string.isRequired
};

export default SearchRejected;
