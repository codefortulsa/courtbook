import React from "react";
import {shallow} from "enzyme";
import proxyquire from "proxyquire";
import setup from "../../setup";

describe("<CourtCaseBreadcrumbs/>", () => {
    const {expect, chance, sandbox, reduxStore} = setup();

    const navigateViewCourtCase = sandbox.stub();
    const navigateHome = sandbox.stub();
    const deps = {
        "../store/actions/NavigationActions": {
            navigateViewCourtCase,
            navigateHome
        }
    };
    const CourtCaseBreadcrumbs = proxyquire("../../../src/client/court-case/CourtCaseBreadcrumbs", deps).default;

    const store = reduxStore();
    const caseId = chance.integer() + "";
    const caseNumber = chance.guid();
    const party = chance.name();
    const activeBreadcrumbText = `Edit ${chance.word()}`;

    const render = () => shallow(<CourtCaseBreadcrumbs store={store} caseId={caseId} caseNumber={caseNumber}
                                                       party={party} activeBreadcrumbText={activeBreadcrumbText}/>).shallow();

    it("Should render home breadcrumb", () => {
        const wrapper = render();

        const breadcrumb = wrapper.find("#breadcrumb-home");
        expect(breadcrumb.html()).to.contain("Home");
    });

    it("Should render case breadcrumb", () => {
        const wrapper = render();

        const breadcrumb = wrapper.find("#breadcrumb-case");
        expect(breadcrumb.html()).to.contain(`Case Number ${caseNumber} (${party})`);
    });

    it("Should render active breadcrumb", () => {
        const wrapper = render();

        const breadcrumb = wrapper.find("#breadcrumb-active");
        expect(breadcrumb.html()).to.contain(activeBreadcrumbText);
        expect(breadcrumb).to.have.prop("active", true);
    });

    it("Click home breadcrumb navigates home", () => {
        const action = chance.reduxAction();
        navigateHome.returns(action);

        const wrapper = render();

        wrapper.find("#breadcrumb-home").simulate("click");

        expect(navigateHome).to.have.been.called();
        expect(store.dispatch).to.have.been.calledWith(action);
    });

    it("Click case number breadcrumb navigates view case", () => {
        const action = chance.reduxAction();
        navigateViewCourtCase.returns(action);

        const wrapper = render();

        wrapper.find("#breadcrumb-case").simulate("click");

        expect(navigateViewCourtCase).to.have.been.calledWith(caseId);
        expect(store.dispatch).to.have.been.calledWith(action);
    });
});
