import express from "express";
import {CourtCase, CourtCaseEvent} from "./db/models";

const router = express.Router();

// router.route('/v1/case/:caseNumber/person/:personName')
// .get((req, res) => res.send(getReminderByCaseNumberAndName(req.params.caseNumber, req.params.personName)));

const handleError = (res, message) => (err) => {
    console.error(message, err);
    res.send(message);
};

const caseFromReq = (req) => ({caseNumber: req.params.caseNumber, defendant: req.params.defendant});

const caseUrl = "/v1/cases/case/:caseNumber/defendant/:defendant";

router.route(caseUrl)
    .get((req, res) =>
        CourtCase.where(caseFromReq(req)).fetch()
            .then(courtCase => res.send(courtCase.toJSON()))
            .catch(handleError(res, "Failed to fetch court case.")))
    .post((req, res) =>
        CourtCase.forge(caseFromReq(req)).save(null)
            .then((createdCourtCase) => res.send(createdCourtCase.toJSON()))
            .catch(() => res.send("Failed to create court case.")))
    .put((req, res) => res.send("UPDATED"));

const eventsUrl = `${caseUrl}/events`;

router.route(eventsUrl)
    .get((req, res) =>
        CourtCase.where(caseFromReq(req)).fetch()
            .then(courtCase => CourtCaseEvent.where({courtCaseId: courtCase.id}).fetchAll())
            .then(courtCaseEvents => res.send(courtCaseEvents.toJSON()))
            .catch(handleError(res, "Failed to fetch events.")));

const eventUrl = `${eventsUrl}/event`;

router.route(eventUrl)
    .post((req, res) =>
        CourtCase.where(caseFromReq(req)).fetch()
            .courtCaseEvents().attach(req.body)
            .then((courtCase) => res.send(courtCase.toJSON()))
            .catch(() => res.send("Failed to create court case events.")));

// const eventUrl = `${eventsUrl}/event/:eventId`;
//
// router.route(eventUrl)
//     .get((req, res) => res.send("GET ONE EVENT"))
//     .put((req, res) => res.send("UPDATE ONE EVENT"));

export default router;
