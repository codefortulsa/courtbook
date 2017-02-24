import _ from "lodash";
import expressJwt from "express-jwt";

export const secret = (req, tokenPayload, cb) => {
    console.info("req", req);
    console.info("tokenPayload", tokenPayload);
    if (_.includes(tokenPayload.aud, process.env.AUTH0_COURTBOT_UI_CLIENT_ID)) {
        cb(null, process.env.AUTH0_COURTBOT_UI_CLIENT_SECRET);
    } else {
        cb(null, process.env.AUTH0_COURTBOT_SIGNING_CERT);
    }
};

const bypassAuthentication = (err, req, res, next) => next();

const jwtAuthentication = expressJwt({secret});

export default process.env.BYPASS_AUTH === 'true' ? bypassAuthentication : jwtAuthentication;
