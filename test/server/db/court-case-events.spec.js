import _ from "lodash";
import {expect} from "chai";
import setup from "../../setup";
import {CourtCase} from "../../../src/server/db/models";
import {createEvent, getEventsByCaseId} from "../../../src/server/db/court-case-events";

describe("court-case-events", function () {
    const {chance} = setup();

    const createCourtCase = () => CourtCase.forge(chance.courtCase({id: undefined})).save(null);

    const createEvents = (events) =>
        createCourtCase()
            .then(courtCase => {
                const eventsToCreate = events.map(event => ({...event, courtCaseId: courtCase.id}));
                return courtCase
                    .courtCaseEvents()
                    .attach(eventsToCreate);
            });

    it("createEvent", function () {
        return createCourtCase()
            .then(courtCase => {
                const eventToCreate = _.omit(chance.event({courtCaseId: courtCase.id}), "id");
                return createEvent(eventToCreate)
                    .then(createdEvent => {
                        expect(createdEvent.attributes).to.eql({...eventToCreate});
                    });
            });
    });

    describe("getEventsByCaseId", () => {
        const test = (events, testFnc) =>
            createEvents(events).then((createdEvents) =>
                getEventsByCaseId(createdEvents.head().attributes.courtCaseId)
                    .then((retrievedEvents) => testFnc({
                        createdEvents: _.map(createdEvents.models, "attributes"),
                        retrievedEvents: _.map(retrievedEvents.models, "attributes"),
                    })));

        it("should get events for case", () => {
            const events = chance.n(chance.event, 3);
            return test(events, ({retrievedEvents, createdEvents}) => {
                expect(retrievedEvents).to.have.length(events.length);
                expect(_.map(retrievedEvents, "id")).to.have.members(_.map(createdEvents, "id"));
            });
        });
    });
});
