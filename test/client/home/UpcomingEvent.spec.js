import React from 'react';
import {shallow} from 'enzyme';
import UpcomingEvent from "../../../src/client/home/UpcomingEvent";
import {toDatetime} from "../../../src/client/utils/formatDate";
import setup from "../../setup";

describe("<UpcomingEvent/>", () => {
    const {expect, chance} = setup();

    it("Should render case event", () => {
        const event = chance.event();

        const wrapper = shallow(<UpcomingEvent event={event}/>);

        expect(wrapper).to.contain(event.courtCase.caseNumber);
        expect(wrapper).to.contain(event.courtCase.party);
        expect(wrapper).to.contain(event.description);
        expect(wrapper).to.contain(toDatetime(event.date));
    });
});
