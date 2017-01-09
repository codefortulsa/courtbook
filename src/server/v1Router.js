import express from "express";
import models from "./models";

const cases = {
    FAKE1: {
        defendants: [
            {name: "Mickey Mouse"},
            {name: "Minnie Mouse"}
        ],
        events: {
            "Mickey Mouse": [
                {date: "2016-12-30T05:49:20+00:00", description: "PRELIMINARY HEARING ISSUE (PUBLIC DEFENDER)"}
            ],
            "Minnie Mouse": [
                {date: "2016-12-30T05:49:20+00:00", description: "PRELIMINARY HEARING ISSUE (PUBLIC DEFENDER)"},
                {date: "2016-12-30T05:49:20+00:00", description: "HEARING #2"},
                {date: "2016-12-30T05:49:20+00:00", description: "HEARING #3"}
            ]
        }
    },
    FAKE2: {
        defendants: [
            {name: "Donald Duck"},
            {name: "Daisy Duck"}
        ],
        events: {
            "Donald Duck": [],
            "Daisy Duck": []
        }
    },
    FAKE3: {
        defendants: [
            {name: "Scrooge McDuck"}
        ],
        events: {
            "Scrooge McDuck": [
                {date: "2016-12-30T05:49:20+00:00", description: "PRELIMINARY HEARING ISSUE (PUBLIC DEFENDER)"},
                {date: "2016-12-30T05:49:20+00:00", description: "HEARING #2"},
                {date: "2016-12-30T05:49:20+00:00", description: "HEARING #3"},
                {date: "2016-12-30T05:49:20+00:00", description: "HEARING #4"},
                {date: "2016-12-30T05:49:20+00:00", description: "HEARING #5"}
            ]
        }
    }
};

const router = express.Router();

export const getPeopleByCaseNumber = (req, res) => {
    const {caseNumber} = req.params;
    console.info("Getting people for case number: ", caseNumber);
    const theCase = cases[caseNumber];
    res.send(theCase ? theCase.defendants : []);
};


export const getNotifications = (req, res) => {
    const {caseNumber, personName} = req.params;
    console.info("Getting people for case number:", caseNumber, "and person:", personName);
    const events = cases[caseNumber] && cases[caseNumber].events ? cases[caseNumber].events[personName] : [];
    res.send(events ? events : []);
};

export const createReminders = (req, res) => {
    const personReminders = req.body;
    models.Person.create(personReminders)
        .then(() => console.info("DONE") || res.send("WOOT"));
};

router.route('/v1/case/:caseNumber')
    .get(getPeopleByCaseNumber);

router.route('/v1/case/:caseNumber/person/:personName')
    .get(getNotifications);

router.route('/v1/reminders')
    .post(createReminders);

router.route("/people")
    .get((req, res) => {
    models.Person.findAll({include: [models.Person.Notifications]}).then(data => res.send(data))
});

//
// app.get("/notifications", (req, res) => {
//     models.Notification.findAll({include: [models.Person]})
//         .then(data => res.send(data))
// });

export default router;
