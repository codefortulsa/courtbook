import {expect} from "chai";
import _ from "lodash";
import setup from "../../setup";
import moment from "moment";
import {CourtCase} from "../../../src/server/db/models";
import {
    createEvent,
    getEventsByCaseId,
    getPastEventsByCaseId,
    getFutureEventsByCaseId
} from "../../../src/server/db/court-case-events";

describe("court-case-events", function () {
    const {chance} = setup();

    const createCourtCase = () =>
        CourtCase.forge(chance.courtCase({id: undefined})).save(null);

    const createEvents = (events) =>
        createCourtCase().then(courtCase =>
            courtCase.courtCaseEvents().attach(events)
                .then((events => ({events, courtCase}))));

    const currentYear = Number(moment().format("YYYY"));

    const randomEvent = (props) => _.omit(chance.event(props), "id");

    const twoYearOldEvent = randomEvent({date: chance.date({year: currentYear - 2})});
    const fiveYearOldEvent = randomEvent({date: chance.date({year: currentYear - 5})});
    const twoYearFromNowEvent = randomEvent({date: chance.date({year: currentYear + 2})});
    const fiveYearFromNowEvent = randomEvent({date: chance.date({year: currentYear + 5})});

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

    it("getEventsByCaseId", () => {
        const events = chance.n(() => _.omit(chance.event(), "id", "courtCaseId"), 10);
        return createEvents(events).then(({courtCase}) =>
            getEventsByCaseId(courtCase.id).then(fetchedEventCollection => {
                const fetchedEvents = _.map(fetchedEventCollection.models, "attributes");
                expect(fetchedEvents).to.have.length(events.length);
            }));
    });

    describe("getPastEventsByCaseId", () => {
        it("should sort past events by most recent to oldest", () => {
            const events = [fiveYearOldEvent, twoYearOldEvent];
            return createEvents(events).then(({courtCase}) =>
                getPastEventsByCaseId(courtCase.id).then(fetchedEventCollection => {
                    const fetchedEvents = _.map(fetchedEventCollection.models, "attributes");
                    expect(fetchedEvents).to.have.length(events.length);
                    expect(fetchedEvents[0].date).to.eql(twoYearOldEvent.date);
                    expect(fetchedEvents[1].date).to.eql(fiveYearOldEvent.date);
                }));
        });

        it("should not get future events", () => {
            const events = [fiveYearFromNowEvent, twoYearFromNowEvent];
            return createEvents(events).then(({courtCase}) =>
                getPastEventsByCaseId(courtCase.id).then(fetchedEventCollection => {
                    expect(fetchedEventCollection.models).to.be.empty();
                }));
        });
    });

    describe("getFutureEventsByCaseId", () => {
        it("should order future events by upcoming to latest", () => {
            const events = [fiveYearFromNowEvent, twoYearFromNowEvent];
            return createEvents(events).then(({courtCase}) =>
                getFutureEventsByCaseId(courtCase.id).then(fetchedEventCollection => {
                    const fetchedEvents = _.map(fetchedEventCollection.models, "attributes");
                    expect(fetchedEvents).to.have.length(events.length);
                    expect(fetchedEvents[0].date).to.eql(twoYearFromNowEvent.date);
                    expect(fetchedEvents[1].date).to.eql(fiveYearFromNowEvent.date);
                }));
        });

        it("should not get past events", () => {
            const events = [fiveYearOldEvent, twoYearOldEvent];
            return createEvents(events).then(({courtCase}) =>
                getFutureEventsByCaseId(courtCase.id).then(fetchedEventCollection => {
                    expect(fetchedEventCollection.models).to.be.empty();
                }));
        });
    });
});
