import React from "react";
import {shallow} from "enzyme";
import require from "proxyquire";
import {toDatetime} from "../../../src/client/utils/formatDate";
import setup from "../../setup";

describe("<UpcomingEvent/>", () => {
    const {expect, chance, sandbox, reduxStore} = setup();

    const navigateViewCourtCase = sandbox.stub();
    const deps = {
        "../store/actions/NavigationActions": {
            navigateViewCourtCase
        }
    };
    const UpcomingEvent = require("../../../src/client/home/UpcomingEvent", deps).default;

    const randomEvent = () => {
        const courtCase = chance.courtCase();
        return {
            ...chance.event(courtCase),
            courtCase
        };
    };

    it("Should render case event", () => {
        const event = randomEvent();

        const wrapper = shallow(<UpcomingEvent store={reduxStore()} event={event}/>).shallow();

        expect(wrapper).to.contain(event.courtCase.caseNumber);
        expect(wrapper).to.contain(event.courtCase.party);
        expect(wrapper).to.contain(event.description);
        expect(wrapper).to.contain(toDatetime(event.date));
    });

    it("Should have link to view court case", () => {
        const event = randomEvent();
        const store = reduxStore();
        const action = chance.reduxAction();
        navigateViewCourtCase.returns(action);

        const wrapper = shallow(<UpcomingEvent store={store} event={event}/>).shallow();
        wrapper.find('#view-case').simulate('click');

        expect(navigateViewCourtCase).to.have.been.calledWith(event.courtCaseId);
        expect(store.dispatch).to.have.been.calledWith(action);
    });
});
