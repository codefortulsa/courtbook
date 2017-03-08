import {expect} from "chai";
import setup from "../../setup";
import _ from "lodash";
import {createCourtCase, fetchCaseById} from "../../../src/server/db/court-case";

describe("court-case", function () {
    const {chance} = setup();

    it("should be able to create case and fetch it", () => {
        const courtCaseToCreate = _.omit(chance.courtCase(), "id");
        return createCourtCase(courtCaseToCreate)
            .then(courtCase => {
                expect(courtCase.id).to.exist();
                return fetchCaseById(courtCase.id)
                    .then(fetchedCourtCase => {
                        expect(fetchedCourtCase).to.exist();
                        expect(fetchedCourtCase.attributes).to.eql(courtCase.attributes);
                    });
            });
    });
});
