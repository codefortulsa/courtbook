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
    communicationType: stakeholder.contactType
});

export const registerStakeholderWithCourtbot = ({courtCase, stakeholder}) =>
    agent.post(`${courtbotBaseUri()}/courtbook/register`, courtbotRegistration(courtCase.attributes, stakeholder.attributes));
