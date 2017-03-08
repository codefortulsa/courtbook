import {expect} from "chai";
import setup from "../../setup";
import _ from "lodash";
import {
    createCourtCase,
    fetchCaseById,
    fetchCaseByCaseInsensitiveCaseNumberAndParty
} from "../../../src/server/db/court-case";

describe("court-case", function () {
    const {chance} = setup();

    let courtCase;
    beforeEach(() => {
        const courtCaseToCreate = _.omit(chance.courtCase(), "id");
        return createCourtCase(courtCaseToCreate)
            .then(x => courtCase = x);
    });

    describe("fetchCaseById", () => {
        it("should fetch case by id", () => {
            return fetchCaseById(courtCase.id)
                .then(fetchedCourtCase => {
                    expect(fetchedCourtCase).to.exist();
                    expect(fetchedCourtCase.attributes).to.eql(courtCase.attributes);
                });
        });
    });

    describe("fetchCaseByCaseInsensitiveCaseNumberAndParty", () => {
        it("resolve with null when case does not exist", () => {
            return expect(fetchCaseByCaseInsensitiveCaseNumberAndParty(chance.guid(), chance.guid()))
                .to.eventually.be.null();
        });

        it("resolve with null when case exists but party does not exist for given case", () => {
            const caseNumber = courtCase.get("caseNumber");
            return expect(fetchCaseByCaseInsensitiveCaseNumberAndParty(caseNumber, chance.guid()))
                .to.eventually.be.null();
        });

        it("resolve with null when party exists but not for the given case", () => {
            const party = courtCase.get("party");
            return expect(fetchCaseByCaseInsensitiveCaseNumberAndParty(chance.guid(), party))
                .to.eventually.be.null();
        });

        it("resolve case exact case number and party is found", () => {
            const party = courtCase.get("party");
            const caseNumber = courtCase.get("caseNumber");
            return expect(fetchCaseByCaseInsensitiveCaseNumberAndParty(caseNumber, party))
                .to.eventually.have.property("attributes").eql(courtCase.attributes);
        });

        it("should resolve with case when found by case insensitive case number and party", () => {
            const party = courtCase.get("party").toUpperCase();
            const caseNumber = courtCase.get("caseNumber").toUpperCase();
            return expect(fetchCaseByCaseInsensitiveCaseNumberAndParty(caseNumber, party))
                .to.eventually.have.property("attributes").eql(courtCase.attributes);
        });
    });
});
