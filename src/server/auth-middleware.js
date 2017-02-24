import expressJwt from "express-jwt";

const bypassAuthentication = (err, req, res, next) => next();

const jwtAuthentication = expressJwt({secret: process.env.AUTH0_COURTBOT_UI_CLIENT_SECRET});

export default process.env.BYPASS_AUTH === 'true' ? bypassAuthentication : jwtAuthentication;
