import {match} from "sinon";
import require from "proxyquire";
import setup from "../setup";

describe("error-handling-middleware", () => {
    const {expect, sandbox, chance} = setup();

    const stubRes = ({headersSent = false}) => {
        const res = {headersSent};
        res.status = sandbox.stub().returns(res);
        res.send = sandbox.stub();
        return res;
    };

    const init = () => {
        const error = new Error(chance.sentence());
        const referenceCode = chance.guid();
        const log = {error: sandbox.stub()};
        const res = stubRes({});

        const middleware = require("../../src/server/error-handling-middleware",
            {
                "log4js": {
                    getLogger: () => log
                },
                "chance": function () {
                    return {
                        guid: () => referenceCode
                    }
                }
            }).default;

        return {
            middleware,
            referenceCode,
            res,
            log,
            error
        }
    };

    it("Do nothing if headers already sent", () => {
        const res = stubRes({headersSent: true});
        const {middleware} = init();

        middleware(undefined, undefined, res);

        expect(res.status).to.have.not.been.called();
        expect(res.send).to.have.not.been.called();
    });

    it("Should log error", () => {
        const {res, error, log, middleware} = init();

        middleware(error, undefined, res);

        expect(log.error).to.have.been.calledWithMatch("Error");
        expect(log.error).to.have.been.calledWithMatch(error.message);
        expect(log.error).to.have.been.calledWith(sandbox.match.any, error);
    });

    it("Should log reference code", () => {
        const {res, error, log, referenceCode, middleware} = init();

        middleware(error, undefined, res);

        expect(log.error).to.have.been.calledWithMatch(referenceCode);
    });

    it("Should respond with reference code in json", () => {
        const {res, error, referenceCode, middleware} = init();

        middleware(error, undefined, res);

        expect(res.send).to.have.been.calledWith({
            status: 500,
            message: `Internal Server Error occurred. Please report reference code ${referenceCode}.`
        });
    });

    it("Should respond with 500", () => {
        const {res, error, middleware} = init();

        middleware(error, undefined, res);

        expect(res.status).to.have.been.calledWith(500);
    });
});
