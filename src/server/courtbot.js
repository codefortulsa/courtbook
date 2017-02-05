import agent from "superagent";
import superagentAsPromised from "superagent-as-promised";
superagentAsPromised(agent, Promise);

const courtbotBaseUri = () => process.env.COURTBOT_BASE_URI;
const courtbotApiToken = () => process.env.COURTBOT_API_TOKEN;

const courtbotRegistration = (courtCase, stakeholder) => ({
    api_token: courtbotApiToken(),
    user: "courtbot",
    caseNumber: courtCase.caseNumber,
    name: courtCase.defendant,
    contact: stakeholder.contact,
    communication_type: stakeholder.contactType
});

const handleRegistrationRejected = (error) => {
    console.error("Courtbot registration failed:", error, error.stack);
    return Promise.reject("Could not register stakeholder with Courtbot");
};

const handleRegistrationResolved = (response) => {
    const message = response.body.message;
    if (response.body.success || message === "User has an existing registration") {
        return Promise.resolve();
    }
    return handleRegistrationRejected(message);
};

export const registerStakeholderWithCourtbot = ({courtCase, stakeholder}) =>
    agent.post(`${courtbotBaseUri()}/courtbook/register`, courtbotRegistration(courtCase.attributes, stakeholder.attributes))
        .then(handleRegistrationResolved, handleRegistrationRejected)
        .then(() => Promise.resolve({courtCase, stakeholder}));
