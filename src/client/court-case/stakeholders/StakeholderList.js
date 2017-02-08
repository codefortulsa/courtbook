import React from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";

const noStakeholders = <div>There are currently no stakeholders.</div>;

export const StakeholderList = ({stakeholders}) => {
    const stakeholderListGroup =
        <ListGroup>
            {stakeholders.map(stakeholder =>
                <ListGroupItem key={stakeholder.id} header={stakeholder.name}>{stakeholder.contact}</ListGroupItem>
            )}
        </ListGroup>;

    return stakeholders.length ? stakeholderListGroup : noStakeholders;
};

StakeholderList.displayName = "StakeholderList";

StakeholderList.propTypes = {
    stakeholders: React.PropTypes.array.isRequired
};
