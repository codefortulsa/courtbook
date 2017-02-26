import Chance from "chance";
import {getLogger} from "log4js";

const log = getLogger("error-handling-middleware");

const chance = new Chance();

const errorHandlingMiddleware = (err, req, res, next) => {
    if (!res.headersSent) {
        const referenceCode = chance.guid();
        log.error(`Error (ref ${referenceCode}): ${err.message}`, err);
        res.status(500).send({
            status: 500,
            message: `Internal Server Error occurred. Please report reference code ${referenceCode}.`
        });
    }
};

export default errorHandlingMiddleware;
