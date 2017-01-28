import _ from 'lodash';
import {expect} from "chai";
import setup from "../../setup";
import {CourtCase, CourtCaseEvent} from "../../../src/server/db/models";

describe("models", function () {
    const {chance} = setup();

    it("save court case", function () {
        const courtCase = randomCourtCase();
        return new CourtCase(courtCase)
            .save(null)
            .then(actual => {
                expect(actual.attributes.id).to.exist();
                expect(actual.attributes.defendant).to.eql(courtCase.defendant);
                expect(actual.attributes.caseNumber).to.eql(courtCase.caseNumber);
            });
    });

    it("save events", function () {
        return new CourtCase(randomCourtCase())
            .save(null)
            .then(courtCase => {
                console.info("courtCase.courtCaseEvents()=", courtCase.courtCaseEvents());
                return courtCase
                    .courtCaseEvents().attach([randomCaseEvent(), randomCaseEvent(), randomCaseEvent(), randomCaseEvent()])
                    .then(x => console.info("x=", x.toJSON()));
            });
    });

    it("sql injection test", function () {
        // return CourtCase.query(qb => qb.where('caseNumber', 'LIKE', '%Courtbot'))
        const search = "Courtbot";
        return CourtCase.query(qb => qb.whereRaw(`LOWER("caseNumber") LIKE LOWER(?)`, [`%${search}%`]))
            .fetchAll()
            .then(cases => {
                console.info("cases=", cases.toJSON());
            });
    });

    const randomCourtCase = () => ({
        defendant: chance.name(),
        caseNumber: chance.guid()
    });

    const randomCaseEvent = () => ({
        date: chance.date()
    });
});
