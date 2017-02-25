import expressJwt from "express-jwt";
import jwks from "jwks-rsa";
import {getLogger} from "log4js";

const log = getLogger("www");

export const bypassAuthentication = (err, req, res, next) => {
    log.warn("Bypassing authentication!");
    next();
};

export const uiAuthentication = expressJwt({secret: process.env.AUTH0_COURTBOOK_UI_CLIENT_SECRET});

export const apiAuthentication = expressJwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: false,
        jwksUri: process.env.AUTH0_COURTBOOK_API_JWKS_URI
    }),
    audience: process.env.AUTH0_COURTBOOK_API_AUDIENCE,
    issuer: process.env.AUTH0_COURTBOOK_API_ISSUER,
    algorithms: ['RS256']
});
