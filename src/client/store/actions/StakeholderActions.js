import _ from "lodash";
import {deleteStakeholderById, updateStakeholder, createStakeholder} from "../../courtbook-api";

export const SAVE_STAKEHOLDERS = "SAVE_STAKEHOLDERS";

const createNewStakeholders = (courtCaseId, stakeholders) => {
    const newStakeholders = _.chain(stakeholders)
        .compact() // todo: atm adding an stakeholder without entering data causes the stakeholder to be null
        .filter((stakeholder) => !stakeholder.id)
        .map(stakeholder => _.assign({}, stakeholder, {courtCaseId}))
        .value();
    return Promise.all(_.map(newStakeholders, createStakeholder));
};

const deleteStakeholders = (stakeholders, existingStakeholderIds) => {
    const stakeholderIdsToNotDelete = _.map(stakeholders, "id");
    const stakeholdersIdToDelete = _.without(existingStakeholderIds, ...stakeholderIdsToNotDelete);
    return Promise.all(_.map(stakeholdersIdToDelete, deleteStakeholderById));
};

const updateStakeholders = (stakeholders) => {
    const stakeholdersToUpdate = _.filter(stakeholders, "id");
    return Promise.all(_.map(stakeholdersToUpdate, updateStakeholder));
};

export const saveStakeholders = ({courtCaseId, stakeholders, existingStakeholderIds}) => ({
    type: SAVE_STAKEHOLDERS,
    payload: Promise.all([
        createNewStakeholders(courtCaseId, stakeholders),
        deleteStakeholders(stakeholders, existingStakeholderIds),
        updateStakeholders(stakeholders)
    ])
});
