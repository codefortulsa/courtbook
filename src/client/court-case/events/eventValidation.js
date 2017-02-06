import {combineValidators, isRequired} from "revalidate";

export const eventValidation =
    combineValidators({
        "events[].date": isRequired("Date"),
        "events[].description": isRequired("Description")
    });

