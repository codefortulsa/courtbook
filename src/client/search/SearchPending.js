import React from "react";

const SearchPending = ({searchStatus}) =>
    searchStatus !== "PENDING" ? null : <div>Searching...</div>;

SearchPending.displayName = "SearchPending";

SearchPending.propTypes = {
    searchStatus: React.PropTypes.string.isRequired
};

export default SearchPending;
