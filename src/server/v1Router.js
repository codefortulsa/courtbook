import express from "express";
import {
    fetchAllCasesByLikeCaseNumber,
    createCourtCase,
    fetchCaseById,
    fetchCaseByLikeCaseNumberAndLikeDefendant
} from "./db/court-case";
import {createEventForCourtCaseId, getEventsByCaseId} from "./db/court-case-events";

const router = express.Router();

const handleError = (res, message) => (err) => {
    console.error(message, err);
    res.status(500).send(message);
};

const casesBaseUrl = `/v1/cases`;

router.route(casesBaseUrl)
    .get((req, res) =>
        fetchAllCasesByLikeCaseNumber(req.query.caseNumber)
            .then(courtCases => res.send(courtCases))
            .catch(handleError(res, "Failed to fetch all cases by case number.")))
    .post((req, res) =>
        createCourtCase(req.body)
            .then((createdCourtCase) => res.send(createdCourtCase))
            .catch(handleError(res, "Failed to create court case.")));


router.route(`${casesBaseUrl}/:courtCaseId`)
    .get((req, res) =>
        fetchCaseById(req.params.courtCaseId)
            .then(courtCase => res.send(courtCase))
            .catch(handleError(res, "Failed to fetch court case.")));


router.route(`${casesBaseUrl}/:courtCaseId/events`)
    .post((req, res) =>
        createEventForCourtCaseId(req.params.courtCaseId, req.body)
            .then((courtCase) => res.send(courtCase))
            .catch(handleError(res, "Failed to create court case events.")))
    .get((req, res) =>
        fetchCaseById(req.params.courtCaseId)
            .then(courtCase => getEventsByCaseId(courtCase.id))
            .then(courtCaseEvents => res.send(courtCaseEvents))
            .catch(handleError(res, "Failed to fetch events.")));

router.route(`${casesBaseUrl}/:caseNumber/defendant/:defendant/events`)
    .get((req, res) =>
        fetchCaseByLikeCaseNumberAndLikeDefendant(req.params.caseNumber, req.params.defendant)
            .then(courtCase => courtCase ? getEventsByCaseId(courtCase.id) : [])
            .then(courtCaseEvents => res.send(courtCaseEvents))
            .catch(handleError(res, "Failed to get events for case number and defendant.")));

export default router;
