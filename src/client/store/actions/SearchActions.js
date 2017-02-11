import {search} from "../../courtbook-api";

export const SEARCH_CASES = "SEARCH_CASES";

export const searchCases = (searchTerms) => ({
    type: SEARCH_CASES,
    payload: search(searchTerms)
});
