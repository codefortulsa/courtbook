import {match} from "sinon";
import proxyquire from "proxyquire";
import setup from "../setup";

describe("courtbot", () => {
    const {expect, sandbox, chance} = setup();

    let stakeholder, courtCase;
    let courtbotApi, agent;
    let restoreCourtbotBaseUri, restoreCourtbotApiToken;

    beforeEach(() => {
        stakeholder = chance.stakeholder();
        courtCase = chance.courtCase();
        agent = {
            post: sandbox.stub().returns(Promise.resolve())
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

    describe("registerStakeholderWithCourtbot", () => {
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
                    contact: stakeholder.contact,
                    communicationType: stakeholder.contactType
                }));
        });

        it("should register with case number and defendant", function () {
            const promise = courtbotApi.registerStakeholderWithCourtbot({courtCase, stakeholder});

            return promise.then(() => expect(agent.post)
                .calledWithMatch(match.any, {
                    caseNumber: courtCase.caseNumber,
                    name: courtCase.defendant
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
    });
});
