export const REMINDER_FORM_NAME = "reminders";

export const createReminder = (personReminders, dispatch) => {
    dispatch({
        type: "CREATE_REMINDER",
        payload: personReminders
    });
};
