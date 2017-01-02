export const REMINDER_FORM_NAME = "reminders";

export const createReminders = (personReminders, dispatch) => {
    console.info("creating reminders", personReminders);
    dispatch({
        type: "CREATE_REMINDER",
        payload: personReminders
    });
};
