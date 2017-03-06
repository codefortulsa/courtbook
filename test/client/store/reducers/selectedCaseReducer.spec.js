import _ from 'lodash';
import setup from "../../../setup";
import {SELECT_COURT_CASE} from "../../../../src/client/store/actions/CourtCaseActions";
import reducer, {initialState} from "../../../../src/client/store/reducers/selectedCaseReducer";

describe("selectedCaseReducer", () => {
    const {expect, chance} = setup();

    it("default / unknown state", () => {
        const state = reducer(undefined, {type: chance.word()});
        expect(state).to.eql(initialState);
    });

    it("select case", () => {
        const action = {
            type: SELECT_COURT_CASE,
            payload: {
                courtCase: chance.courtCase(),
                pastEvents: chance.n(chance.event, 3),
                futureEvents: chance.n(chance.event, 3),
                stakeholders: chance.n(chance.stakeholder, 3)
            }
        };

        const state = reducer(undefined, action);

        expect(state).to.eql({
            ...action.payload,
            events: _.union(action.payload.futureEvents, action.payload.pastEvents)
        });
    });
});
