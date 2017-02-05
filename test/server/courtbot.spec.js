import {match} from "sinon";
import {CourtCase, Stakeholder} from '../../src/server/db/models';
import proxyquire from "proxyquire";
import setup from "../setup";

describe("courtbot", () => {
    const {expect, sandbox, chance} = setup();

    let stakeholder, courtCase;
    let courtbotApi, agent;
    let restoreCourtbotBaseUri, restoreCourtbotApiToken;

    beforeEach(() => {
        stakeholder = Stakeholder.forge(chance.stakeholder());
        courtCase = CourtCase.forge(chance.courtCase());
        agent = {
            post: sandbox.stub().returns(Promise.resolve({body: {success: true, message: "Registration added"}}))
        };
        courtbotApi = proxyquire("../../src/server/courtbot", {superagent: agent});

        restoreCourtbotBaseUri = process.env.COURTBOT_BASE_URI;
        process.env.COURTBOT_BASE_URI = chance.url();

        restoreCourtbotApiToken = process.env.COURTBOT_API_TOKEN;
        process.env.COURTBOT_API_TOKEN = chance.string({length: 20});
    });

    afterEach(() => {
        process.env.COURTBOT_BASE_URI = restoreCourtbotBaseUri;
        process.env.COURTBOT_API_TOKEN = restoreCourtbotApiToken;
    });

    describe("register stakeholder with courbot", () => {
        it("should post to correct courtbot endpoint", function () {
            const promise = courtbotApi.registerStakeholderWithCourtbot({courtCase, stakeholder});

            return promise.then(() => expect(agent.post)
                .calledWithMatch(`${process.env.COURTBOT_BASE_URI}/courtbook/register`,
                    match.any));
        });

        it("should register stakeholder's contact", function () {
            const promise = courtbotApi.registerStakeholderWithCourtbot({courtCase, stakeholder});

            return promise.then(() => expect(agent.post)
                .calledWithMatch(match.any, {
                    contact: stakeholder.attributes.contact,
                    communication_type: stakeholder.attributes.contactType
                }));
        });

        it("should register with case number and defendant", function () {
            const promise = courtbotApi.registerStakeholderWithCourtbot({courtCase, stakeholder});

            return promise.then(() => expect(agent.post)
                .calledWithMatch(match.any, {
                    caseNumber: courtCase.attributes.caseNumber,
                    name: courtCase.attributes.defendant
                }));
        });

        it("should inform who is registering the stakeholder", function () {
            const promise = courtbotApi.registerStakeholderWithCourtbot({courtCase, stakeholder});

            return promise.then(() => expect(agent.post)
                .calledWithMatch(match.any, {user: "courtbot"}));
        });

        it("should send api_token", function () {
            const promise = courtbotApi.registerStakeholderWithCourtbot({courtCase, stakeholder});

            return promise.then(() => expect(agent.post)
                .calledWithMatch(match.any, {api_token: process.env.COURTBOT_API_TOKEN}));
        });

        it("should resolve with court case and stakeholders", function () {
            const promise = courtbotApi.registerStakeholderWithCourtbot({courtCase, stakeholder});

            return promise.then((resolved) => {
                expect(resolved).to.be.exist();
                expect(resolved.stakeholder).to.be.eql(stakeholder);
                expect(resolved.courtCase).to.be.eql(courtCase);
            });
        });

        describe("courtbot responses", () => {
            it("courtbot service call fails", () => {
                agent.post.returns(Promise.reject(new Error("Unexpected error")));

                const promise = courtbotApi.registerStakeholderWithCourtbot({courtCase, stakeholder});

                return expect(promise).to.be.rejectedWith("Could not register stakeholder with Courtbot");
            });

            it("reject api token is invalid", () => {
                agent.post.returns(Promise.resolve({
                    body: {success: false, message: "Invalid API token."}
                }));

                const promise = courtbotApi.registerStakeholderWithCourtbot({courtCase, stakeholder});

                return expect(promise).to.be.rejectedWith("Could not register stakeholder with Courtbot");
            });

            it("resolve when user has an existing registration", () => {
                agent.post.returns(Promise.resolve({
                    body: {success: false, message: "User has an existing registration"}
                }));

                const promise = courtbotApi.registerStakeholderWithCourtbot({courtCase, stakeholder});

                return expect(promise).to.be.fulfilled();
            });
        });

    });
});
