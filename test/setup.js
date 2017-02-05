import chai from "chai";
import dirtyChai from "dirty-chai";
import sinonChai from "sinon-chai";
import chaiAsPromised from 'chai-as-promised';
import sinon from "sinon";
import Chance from "chance";
import chanceMixin from "./chanceMixin";

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(dirtyChai);

require("../loadEnv")();

function setup() {
    const sandbox = sinon.sandbox.create();

    afterEach(function () {
        sandbox.restore();
    });

    const chance = new Chance();
    chance.mixin(chanceMixin);

    return {
        expect: chai.expect,
        should: chai.should(),
        chance,
        sandbox,
    };
}

export default setup;
