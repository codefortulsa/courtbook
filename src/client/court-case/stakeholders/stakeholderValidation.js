import {combineValidators, isRequired} from "revalidate";

export const stakeholderValidation =
    combineValidators({
        "stakeholders[].name": isRequired("Name"),
        "stakeholders[].contact": isRequired("Phone number")
    });

