import AuthService from "../../utils/AuthService";
import agent from "superagent";
import superagentAsPromised from "superagent-as-promised";
superagentAsPromised(agent, Promise);

export const createPerson = (person) => {
    return agent.post("/v1/person", person).set("Authorization", `Bearer ${AuthService.getToken()}`);
};
