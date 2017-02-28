import nock from "nock";
import chai from "chai";
import chaiEnzyme from 'chai-enzyme';
import dirtyChai from "dirty-chai";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import Chance from "chance";
import chanceMixin from "./chanceMixin";
import AuthService from "../src/client/utils/AuthService";

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(chaiEnzyme());
chai.use(dirtyChai);

require("../loadEnv")();

function setup() {
    const chance = new Chance();
    chance.mixin(chanceMixin);
    const sandbox = sinon.sandbox.create();
    const authToken = chance.guid();

    const reduxStore = (state={}) => ({
        getState: sandbox.stub().returns(state),
        dispatch: sandbox.stub(),
        subscribe: sandbox.stub()
    });

    beforeEach(() => {
        sandbox.stub(AuthService, "getToken").returns(authToken);
    });

    afterEach(function () {
        sandbox.reset();
        sandbox.restore();
        nock.cleanAll();
    });

    return {
        expect: chai.expect,
        should: chai.should(),
        chance,
        sandbox,
        authToken,
        nock,
        reduxStore
    };
}

export default setup;
