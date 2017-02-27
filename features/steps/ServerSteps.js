import app from "../../src/server/app";
import {defineSupportCode} from "cucumber";

const serverContext = {};

defineSupportCode(function ({Before}) {
    Before(function (scenario, cb) {
        if (serverContext.server) {
            return cb();
        }

        serverContext.server = app.listen(5000, cb);
    });
});
