import _ from "lodash";
import log4js from "log4js";

const consoleAppender = () => ({
    "type": "logLevelFilter",
    "level": "DEBUG",
    "appender": {
        "type": "console"
    }
});

const logentriesAppender = () => {
    const logentriesToken = process.env.LOGENTRIES_TOKEN;
    if (logentriesToken) {
        return {
            "type": "logentries-log4js-appender",
            "level": "DEBUG",
            options: {
                "token": logentriesToken
            }
        }
    }
    return undefined;
};

export const configureLogging = () =>
    log4js.configure({
        appenders: _.compact([
            consoleAppender(),
            logentriesAppender()
        ])
    });
