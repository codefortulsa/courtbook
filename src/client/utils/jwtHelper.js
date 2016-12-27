// From https://github.com/auth0-samples/auth0-react-sample/blob/master/01-Login/src/utils/jwtHelper.js

import decode from "jwt-decode";

export function getTokenExpirationDate(token) {
    const decoded = decode(token);
    if (!decoded.exp) {
        return null;
    }

    const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);
    return date;
}

export function isTokenExpired(token) {
    const date = getTokenExpirationDate(token);
    if (date === null) {
        return false;
    }
    return !(date.valueOf() > new Date().valueOf());
}
