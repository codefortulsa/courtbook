import express from "express";
import {
    fetchAllCasesByLikeCaseNumber,
    createCourtCase,
    fetchCaseById,
    fetchCaseByLikeCaseNumberAndLikeParty,
    searchCases
} from "./db/court-case";
import {
    createEvent,
    getEventsByCaseId,
    deleteEventById,
    updateEvent,
    getUpcomingEvents,
    getFutureEventsByCaseId,
    getPastEventsByCaseId
} from "./db/court-case-events";
import {
    createStakeholder,
    getStakeholdersByCaseId,
    deleteStakeholderById,
    updateStakeholder
} from "./db/court-case-stakeholders";

const router = express.Router();

const baseUrl = `/v1`;
const casesBaseUrl = `${baseUrl}/cases`;
const eventsBaseUrl = `${baseUrl}/events`;
const stakeholderBaseUrl = `${baseUrl}/stakeholders`;

router.route(casesBaseUrl)
    .get((req, res, next) => {
        if (req.query.caseNumber) {
            return fetchAllCasesByLikeCaseNumber(req.query.caseNumber)
                .then(courtCases => res.send(courtCases), next);
        } else {
            return searchCases(req.query.search)
                .then(courtCases => res.send(courtCases), next);
        }
    })
    .post((req, res, next) =>
        createCourtCase(req.body)
            .then((createdCourtCase) => res.send(createdCourtCase), next));


router.route(`${casesBaseUrl}/:courtCaseId`)
    .get((req, res, next) =>
        fetchCaseById(req.params.courtCaseId)
            .then(courtCase => res.send(courtCase), next));

router.route(`${casesBaseUrl}/:courtCaseId/events`)
    .get((req, res, next) =>
        fetchCaseById(req.params.courtCaseId)
            .then(courtCase => getEventsByCaseId(courtCase.id))
            .then(courtCaseEvents => res.send(courtCaseEvents), next));

router.route(`${casesBaseUrl}/:courtCaseId/events/future`)
    .get((req, res, next) =>
        fetchCaseById(req.params.courtCaseId)
            .then(courtCase => getFutureEventsByCaseId(courtCase.id))
            .then(courtCaseEvents => res.send(courtCaseEvents), next));

router.route(`${casesBaseUrl}/:courtCaseId/events/past`)
    .get((req, res, next) =>
        fetchCaseById(req.params.courtCaseId)
            .then(courtCase => getPastEventsByCaseId(courtCase.id))
            .then(courtCaseEvents => res.send(courtCaseEvents), next));

router.route(`${casesBaseUrl}/:courtCaseId/stakeholders`)
    .get((req, res, next) =>
        fetchCaseById(req.params.courtCaseId)
            .then(courtCase => getStakeholdersByCaseId(courtCase.id))
            .then(stakeholders => res.send(stakeholders), next));

router.route(`${casesBaseUrl}/:caseNumber/party/:party/events`)
    .get((req, res, next) =>
        fetchCaseByLikeCaseNumberAndLikeParty(req.params.caseNumber, req.params.party)
            .then(courtCase => courtCase ? getEventsByCaseId(courtCase.id) : [])
            .then(courtCaseEvents => res.send(courtCaseEvents), next));

router.route(`${stakeholderBaseUrl}`)
    .post((req, res, next) =>
        createStakeholder(req.body)
            .then(({stakeholder}) => res.send(stakeholder), next))
    .put((req, res, next) =>
        updateStakeholder(req.body)
            .then(({stakeholder}) => res.send(stakeholder), next));

router.route(`${stakeholderBaseUrl}/:id`)
    .delete((req, res, next) =>
        deleteStakeholderById(req.params.id)
            .then(() => res.send("OK"), next));


router.route(`${eventsBaseUrl}/upcoming`)
    .get((req, res, next) =>
        getUpcomingEvents()
            .then(events => res.send(events), next));

router.route(`${eventsBaseUrl}`)
    .post((req, res, next) =>
        createEvent(req.body)
            .then((courtCase) => res.send(courtCase), next))
    .put((req, res, next) =>
        updateEvent(req.body)
            .then(event => res.send(event), next));

router.route(`${eventsBaseUrl}/:courtCaseEventId`)
    .delete((req, res, next) =>
        deleteEventById(req.params.courtCaseEventId)
            .then(() => res.send("OK"), next));

router.route(`*`)
    .all((req, res, next) => res.status(404).send({status: 404, message: "No REST endpoint exists here."}));

export default router;
