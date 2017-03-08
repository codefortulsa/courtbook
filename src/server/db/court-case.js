import {CourtCase} from "./models";

const limit = (limit = 100) => (qb) => qb.limit(limit);

const whereEqualsCaseInsensitive = (column, value) =>
    (qb) => qb.whereRaw(`LOWER("${column}") LIKE LOWER(?)`, [`${value}`]);
const whereCaseNumberEqualsCaseInsensitive = (value) => whereEqualsCaseInsensitive("caseNumber", value);
const wherePartyEqualsCaseInsensitive = (value) => whereEqualsCaseInsensitive("party", value);

const orWhereLike = (column, value) =>
    (qb) => qb.orWhereRaw(`LOWER("${column}") LIKE LOWER(?)`, [`%${value}%`]);
const orWhereCaseNumberLike = (value) => orWhereLike("caseNumber", value);
const orWherePartyLike = (value) => orWhereLike("party", value);

export const fetchAllCasesByCaseNumberEqualsCaseInsensitive = (caseNumber) =>
    CourtCase.query(whereCaseNumberEqualsCaseInsensitive(caseNumber))
        .query(limit())
        .fetchAll();

export const searchCases = (searchTerms) =>
    CourtCase
        .query(orWhereCaseNumberLike(searchTerms))
        .query(orWherePartyLike(searchTerms))
        .query(limit())
        .fetchAll();

export const fetchCaseByCaseInsensitiveCaseNumberAndParty = (caseNumber, party) =>
    CourtCase
        .query(whereCaseNumberEqualsCaseInsensitive(caseNumber))
        .query(wherePartyEqualsCaseInsensitive(party))
        .query(limit())
        .fetch();

export const createCourtCase = (courtCase) => CourtCase.forge(courtCase).save(null);

export const fetchCaseById = (id) => CourtCase.where({id}).fetch();
