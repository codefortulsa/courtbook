import React from "react";
import {reduxForm} from "redux-form";

const RemindersForm = () => (
    <div>
        ...Reminders...
    </div>
);

export default reduxForm({
    form: 'remindersForm'
})(RemindersForm);
