import chai from "chai";
import dirtyChai from "dirty-chai";
import sinonChai from "sinon-chai";
import Chance from "chance";

chai.use(sinonChai);
chai.use(dirtyChai);

require("../loadEnv")();

global.chance = new Chance();
global.expect = chai.expect;
