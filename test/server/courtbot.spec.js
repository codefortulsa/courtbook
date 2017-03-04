import {match} from "sinon";
import {CourtCase, Stakeholder} from "../../src/server/db/models";
import setup from "../setup";
import {registerStakeholderWithCourtbot} from "../../src/server/courtbot";

describe("courtbot", () => {
    const {expect, chance, nock} = setup();

    let stakeholder, courtCase;
    let restoreCourtbotBaseUri, restoreCourtbotApiToken;

    beforeEach(() => {
        stakeholder = Stakeholder.forge(chance.stakeholder());
        courtCase = CourtCase.forge(chance.courtCase());

        restoreCourtbotBaseUri = process.env.COURTBOT_BASE_URI;
        process.env.COURTBOT_BASE_URI = chance.url();

        restoreCourtbotApiToken = process.env.COURTBOT_API_TOKEN;
        process.env.COURTBOT_API_TOKEN = chance.string({length: 20});
    });

    afterEach(() => {
        process.env.COURTBOT_BASE_URI = restoreCourtbotBaseUri;
        process.env.COURTBOT_API_TOKEN = restoreCourtbotApiToken;
    });

    const mockCourtbotRegistration = () => nock(`${process.env.COURTBOT_BASE_URI}`)
        .post('/courtbook/register', {
            api_token: process.env.COURTBOT_API_TOKEN,
            user: "courtbot",
            case_number: courtCase.attributes.caseNumber,
            name: courtCase.attributes.party,
            contact: stakeholder.attributes.contact,
            communication_type: stakeholder.attributes.contactType
        });

    describe("register stakeholder with courbot", () => {
        it("should resolve with court case and stakeholders when registration added", function () {
            mockCourtbotRegistration().reply(200, {success: true, message: "Registration added"});

            const promise = registerStakeholderWithCourtbot({courtCase, stakeholder});

            return promise.then((resolved) => {
                expect(resolved).to.be.exist();
                expect(resolved.stakeholder).to.be.eql(stakeholder);
                expect(resolved.courtCase).to.be.eql(courtCase);
            });
        });

        it("resolve when user has an existing registration", () => {
            mockCourtbotRegistration()
                .reply(200, {success: false, message: "User has an existing registration"});

            const promise = registerStakeholderWithCourtbot({courtCase, stakeholder});

            return promise.then((resolved) => {
                expect(resolved).to.be.exist();
                expect(resolved.stakeholder).to.be.eql(stakeholder);
                expect(resolved.courtCase).to.be.eql(courtCase);
            });
        });

        it("reject api token is invalid", () => {
            mockCourtbotRegistration()
                .reply(401, {success: false, message: "Invalid API token."});

            const promise = registerStakeholderWithCourtbot({courtCase, stakeholder});

            return expect(promise).to.be.rejectedWith("Could not register stakeholder with Courtbot");
        });

        it("reject when invalid phone number", () => {
            mockCourtbotRegistration()
                .reply(401, {success: false, message: "Invalid phone number"});

            const promise = registerStakeholderWithCourtbot({courtCase, stakeholder});

            return expect(promise).to.be.rejectedWith("Could not register stakeholder with Courtbot");
        })
    });
});
