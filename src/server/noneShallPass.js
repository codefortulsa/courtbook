import _ from "lodash";
import expressJwt from "express-jwt";

export const secret = (req, tokenPayload, cb) => {
    if (_.includes(tokenPayload.aud, process.env.AUTH0_COURTBOT_UI_CLIENT_ID)) {
        cb(null, process.env.AUTH0_COURTBOT_UI_CLIENT_SECRET);
    } else {
        cb(null, process.env.AUTH0_COURTBOT_SIGNING_CERT);
    }
};

export const noneShallPass = expressJwt({secret});
export default noneShallPass;
