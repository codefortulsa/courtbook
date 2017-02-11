import {CourtCase} from "./models";

const limit = (limit = 100) => (qb) => qb.limit(limit);

const whereLike = (column, value) =>
    (qb) => qb.whereRaw(`LOWER("${column}") LIKE LOWER(?)`, [`%${value}%`]);
const whereCaseNumberLike = (value) => whereLike("caseNumber", value);
const wherePartyLike = (value) => whereLike("caseNumber", value);
const whereStakeholderNameLike = (value) => whereLike("caseNumber.stakeholder.name", value);

const orWhereLike = (column, value) =>
    (qb) => qb.orWhereRaw(`LOWER("${column}") LIKE LOWER(?)`, [`%${value}%`]);
const orWhereCaseNumberLike = (value) => orWhereLike("caseNumber", value);
const orWherePartyLike = (value) => orWhereLike("caseNumber", value);

export const fetchAllCasesByLikeCaseNumber = (caseNumber) =>
    CourtCase.query(whereCaseNumberLike(caseNumber))
        .query(limit())
        .fetchAll();

export const searchCases = (criteria) =>
    CourtCase
        .query(orWhereCaseNumberLike(criteria))
        .query(orWherePartyLike(criteria))
        .query(limit())
        .fetchAll();

export const fetchCaseByLikeCaseNumberAndLikeParty = (caseNumber, party) =>
    CourtCase
        .query(whereCaseNumberLike(caseNumber))
        .query(wherePartyLike(caseNumber))
        .query(limit())
        .fetch();

export const createCourtCase = (courtCase) => CourtCase.forge(courtCase).save(null);

export const fetchCaseById = (id) => CourtCase.where({id}).fetch();
