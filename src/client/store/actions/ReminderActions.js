import AuthService from "../../utils/AuthService";
import agent from "superagent";
import superagentAsPromised from "superagent-as-promised";
superagentAsPromised(agent, Promise);

export const REMINDER_FORM_NAME = "reminders";

export const createPerson = (person) => {
    return agent.post("/v1/person", person).set("Authorization", `Bearer ${AuthService.getToken()}`);
};

export const createReminders = (personReminders, dispatch) => {
    console.info("creating reminders", personReminders);
    dispatch({
        type: "CREATE_REMINDER",
        payload: personReminders
    });
};
