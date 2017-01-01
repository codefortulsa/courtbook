import React from "react";
import PersonForm from "./PersonForm";
import RemindersForm from "./RemindersForm";
import {PageHeader} from 'react-bootstrap';

const CreatePerson = () => (
    <div>
        <PageHeader>Create Reminders</PageHeader>
        <PersonForm/>
        <RemindersForm/>
    </div>
);

export default CreatePerson;
