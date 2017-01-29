import _ from 'lodash';
import {expect} from "chai";
import setup from "../../setup";
import {CourtCase} from "../../../src/server/db/models";

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

    xit("update", function () {
        const x = new CourtCase(randomCourtCase());
        const y = x.save(null)
            .then(courtCase => {
                console.info("Case attrs=", courtCase.attributes);
                console.info("Case fns=", _.functions(courtCase));
                console.info("Case keys=", _.keys(courtCase));
                return x.set({defendant: "XYZ"}).save();
                // return x.save({defendant: "XYZ"})
            });
        console.info("x=", x);
        console.info("y=", y);
        return y;
    });

    const randomCourtCase = () => ({
        defendant: chance.name(),
        caseNumber: chance.guid()
    });

    const randomCaseEvent = () => ({
        date: chance.date(),
        description: chance.sentence()
    });
});
