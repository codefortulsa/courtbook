import React from "react";
import {shallow} from "enzyme";
import proxyquire from "proxyquire";
import setup from "../../../setup";

describe("<EditEventsBreadcrumbs/>", () => {
    const {expect, chance, sandbox, reduxStore} = setup();

    const navigateViewCourtCase = sandbox.stub();
    const navigateHome = sandbox.stub();
    const deps = {
        "../../store/actions/NavigationActions": {
            navigateViewCourtCase,
            navigateHome
        }
    };
    const EditEventsBreadcrumbs = proxyquire("../../../../src/client/court-case/events/EditEventsBreadcrumbs", deps).default;

    const store = reduxStore();
    const caseId = chance.integer();
    const caseNumber = chance.guid();
    const party = chance.name();

    it("Should render home breadcrumb", () => {
        const wrapper = shallow(<EditEventsBreadcrumbs
            store={store} caseId={caseId} caseNumber={caseNumber} party={party}/>).shallow();

        const breadcrumb = wrapper.find("#breadcrumb-home");
        expect(breadcrumb.html()).to.contain("Home");
    });

    it("Should render case breadcrumb", () => {
        const wrapper = shallow(<EditEventsBreadcrumbs
            store={store} caseId={caseId} caseNumber={caseNumber} party={party}/>).shallow();

        const breadcrumb = wrapper.find("#breadcrumb-case");
        expect(breadcrumb.html()).to.contain(`Case Number ${caseNumber} (${party})`);
    });

    it("Should render edit events breadcrumb", () => {
        const wrapper = shallow(<EditEventsBreadcrumbs
            store={store} caseId={caseId} caseNumber={caseNumber} party={party}/>).shallow();

        const breadcrumb = wrapper.find("#breadcrumb-edit-events");
        expect(breadcrumb.html()).to.contain("Edit Events");
        expect(breadcrumb).to.have.prop("active", true);
    });

    it("Click home breadcrumb navigates home", () => {
        const action = chance.reduxAction();
        navigateHome.returns(action);

        const wrapper = shallow(<EditEventsBreadcrumbs
            store={store} caseId={caseId} caseNumber={caseNumber} party={party}/>).shallow();

        wrapper.find("#breadcrumb-home").simulate("click");

        expect(navigateHome).to.have.been.called();
        expect(store.dispatch).to.have.been.calledWith(action);
    });

    it("Click case number breadcrumb navigates view case", () => {
        const action = chance.reduxAction();
        navigateViewCourtCase.returns(action);

        const wrapper = shallow(<EditEventsBreadcrumbs
            store={store} caseId={caseId} caseNumber={caseNumber} party={party}/>).shallow();

        wrapper.find("#breadcrumb-case").simulate("click");

        expect(navigateViewCourtCase).to.have.been.calledWith(caseId);
        expect(store.dispatch).to.have.been.calledWith(action);
    });
});
