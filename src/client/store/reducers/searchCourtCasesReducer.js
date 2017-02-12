import {SEARCH_CASES, SEARCH_TERMS_ENTERED} from "../actions/SearchActions";

const initialState = {
    searchResults: [],
    searchStatus: "NONE",
    searchTerms: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case `SEARCH_TERMS_ENTERED`:
            return {
                ...state,
                searchTerms: action.payload
            };
        case `${SEARCH_CASES}_FULFILLED`:
            return {
                ...state,
                searchResults: action.payload,
                searchStatus: "FULFILLED"
            };
        case `${SEARCH_CASES}_REJECTED`:
            return {
                ...state,
                searchResults: [],
                searchStatus: "REJECTED"
            };
        case `${SEARCH_CASES}_PENDING`:
            return {
                ...state,
                searchResults: [],
                searchStatus: "PENDING"
            };
        default:
            return state;
    }
};
