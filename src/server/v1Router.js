import express from "express";
import {CourtCase, CourtCaseEvent} from "./db/models";

const router = express.Router();

const handleError = (res, message) => (err) => {
    console.error(message, err);
    res.status(500).send(message);
};

const casesBaseUrl = `/v1/cases`;

router.route(casesBaseUrl)
    .get((req, res) =>
        // Courtbot uses this endpoint
        CourtCase.query(qb => qb.whereRaw(`LOWER("caseNumber") LIKE LOWER(?)`, [`%${req.query.caseNumber}%`]))
            .fetchAll()
            .then(courtCases => res.send(courtCases)))
    .post((req, res) =>
        CourtCase.forge(req.body)
            .save(null)
            .then((createdCourtCase) => res.send(createdCourtCase))
            .catch(handleError(res, "Failed to create court case.")));


router.route(`${casesBaseUrl}/:courtCaseId`)
    .get((req, res) =>
        CourtCase.where({id: req.params.courtCaseId})
            .fetch()
            .then(courtCase => res.send(courtCase))
            .catch(handleError(res, "Failed to fetch court case.")));


const getEventsByCaseId = (courtCaseId) => CourtCaseEvent.where({courtCaseId}).fetchAll();

router.route(`${casesBaseUrl}/:courtCaseId/events`)
    .post((req, res) =>
        CourtCase.where({id: req.params.courtCaseId})
            .fetch()
            .courtCaseEvents().attach(req.body)
            .then((courtCase) => res.send(courtCase))
            .catch(handleError(res, "Failed to create court case events.")))
    .get((req, res) =>
        CourtCase.where({id: req.params.courtCaseId})
            .fetch()
            .then(courtCase => getEventsByCaseId(courtCase.id))
            .then(courtCaseEvents => res.send(courtCaseEvents))
            .catch(handleError(res, "Failed to fetch events.")));

const getCaseByNumberAndDefendant = (caseNumber, defendant) =>
    CourtCase.query(qb => qb
        .whereRaw(`LOWER("caseNumber") LIKE LOWER(?)`, [`%${caseNumber}%`])
        .whereRaw(`LOWER("defendant") LIKE LOWER(?)`, [`%${defendant}%`])
    ).fetch();

router.route(`${casesBaseUrl}/:caseNumber/defendant/:defendant`)
    .get((req, res) =>
        // Courtbot uses this endpoint
        getCaseByNumberAndDefendant(req.params.caseNumber, req.params.defendant)
            .then(courtCase => console.info("courtCase=") || courtCase ? getEventsByCaseId(courtCase.id) : [])
            .then(courtCaseEvents => res.send(courtCaseEvents))
            .catch(handleError(res, "Failed to get events for case number and defendant.")));

export default router;
