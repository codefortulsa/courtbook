import {defineSupportCode} from "cucumber";
import Chance from "chance";
import {expect} from "chai";
import agent from "superagent";
import superagentAsPromised from "superagent-as-promised";
superagentAsPromised(agent);

const chance = Chance();

defineSupportCode(function ({Given, Then, When, Before}) {
    Before(function () {
        this.courtCaseApiContext = {};
    });

    When('I create a new court case using the API', function () {
        return agent.get("http://localhost:5000/api/v1/cases?caseNumber=a")
            .then((res) => console.info("res", res.body))
    });

    Then('the court case is created', function () {

    });
});
