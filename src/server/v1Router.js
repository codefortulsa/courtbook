import express from "express";
import {CourtCase, CourtCaseEvent} from "./db/models";

const router = express.Router();

// router.route('/v1/case/:caseNumber/person/:personName')
// .get((req, res) => res.send(getReminderByCaseNumberAndName(req.params.caseNumber, req.params.personName)));

const handleError = (res, message) => (err) => {
    console.error(message, err);
    res.status(500).send(message);
};

const casesUrl = `/v1/cases`;
router.route(casesUrl)
    .post((req, res) =>
        CourtCase.forge(req.body).save(null)
            .then((createdCourtCase) => res.send(createdCourtCase.toJSON()))
            .catch(handleError(res, "Failed to create court case.")));


const caseUrl = `${casesUrl}/case/:courtCaseId`;
router.route(caseUrl)
    .get((req, res) =>
        CourtCase.where({id: req.params.courtCaseId}).fetch()
            .then(courtCase => res.send(courtCase.toJSON()))
            .catch(handleError(res, "Failed to fetch court case.")))
    .put((req, res) => res.send("UPDATED"));


const eventsUrl = `${caseUrl}/events`;
router.route(eventsUrl)
    .get((req, res) =>
        CourtCase.where({id: req.params.courtCaseId}).fetch()
            .then(courtCase => CourtCaseEvent.where({courtCaseId: courtCase.id}).fetchAll())
            .then(courtCaseEvents => res.send(courtCaseEvents.toJSON()))
            .catch(handleError(res, "Failed to fetch events.")));


const eventUrl = `${eventsUrl}/event`;
router.route(eventUrl)
    .post((req, res) =>
        CourtCase.where({id: req.params.courtCaseId}).fetch()
            .courtCaseEvents().attach(req.body)
            .then((courtCase) => res.send(courtCase.toJSON()))
            .catch(handleError(res, "Failed to create court case events.")));

export default router;
