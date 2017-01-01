import React from "react";
import CreatePersonForm from "./CreatePersonForm";
import {PageHeader} from 'react-bootstrap';

const CreatePerson = () => (
    <div>
        <PageHeader>Create Reminders</PageHeader>
        <CreatePersonForm/>
    </div>
);

export default CreatePerson;
