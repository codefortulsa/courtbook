import {Stakeholder} from "./models";
import {fetchCaseById} from "./court-case";
import {registerStakeholderWithCourtbot} from "../courtbot";

export const createStakeholder = (stakeholder) =>
    fetchCaseById(stakeholder.courtCaseId)
        .then(courtCase => courtCase.stakeholders()
            .attach(stakeholder)
            .then((createdStakeholders) => Promise.resolve({courtCase, stakeholder: createdStakeholders.head()})))
        .then(registerStakeholderWithCourtbot);

export const getStakeholdersByCaseId = (courtCaseId) => Stakeholder.where({courtCaseId}).fetchAll();

export const getStakeholderById = (id) => Stakeholder.where({id}).fetch();

export const deleteStakeholderById = (stakeholderId) => getStakeholderById(stakeholderId).then(stakeholder => stakeholder.destroy());

export const updateStakeholder = (stakeholder) => getStakeholderById(stakeholder.id).then(existing => existing.set(stakeholder).save());
