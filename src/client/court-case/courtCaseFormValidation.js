import {combineValidators, isRequired} from "revalidate";

export const courtCaseFormValidation =
    combineValidators({
        caseNumber: isRequired("Case number"),
        party: isRequired("Party")
    });

