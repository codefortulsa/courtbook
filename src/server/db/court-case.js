import {CourtCase} from "./models";

export const fetchAllCasesByLikeCaseNumber = (caseNumber) =>
    CourtCase
        .query(qb => qb.whereRaw(`LOWER("caseNumber") LIKE LOWER(?)`, [`%${caseNumber}%`]))
        .fetchAll();

export const fetchCaseByLikeCaseNumberAndLikeDefendant = (caseNumber, defendant) =>
    CourtCase.query(qb => qb
        .whereRaw(`LOWER("caseNumber") LIKE LOWER(?)`, [`%${caseNumber}%`])
        .whereRaw(`LOWER("defendant") LIKE LOWER(?)`, [`%${defendant}%`])
    ).fetch();

export const createCourtCase = (courtCase) => CourtCase.forge(courtCase).save(null);

export const fetchCaseById = (id) => CourtCase.where({id}).fetch();
