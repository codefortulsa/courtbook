import {search} from "../../courtbook-api";

export const SEARCH_CASES = "SEARCH_CASES";
export const SEARCH_TERMS_ENTERED = "SEARCH_TERMS_ENTERED";

export const searchCases = (searchTerms) => (dispatch) => {
    dispatch({
        type: SEARCH_TERMS_ENTERED,
        payload: searchTerms
    });

    dispatch({
        type: SEARCH_CASES,
        payload: search(searchTerms ? searchTerms : "")
    });
};
