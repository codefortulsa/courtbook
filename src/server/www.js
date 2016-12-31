import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import logfmt from "logfmt";
import path from "path";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpack from "webpack";
import webpackConfig from "../../webpack.config";
import expressJwt from "express-jwt";
import dotenv from "dotenv";
import {getPeopleByCaseNumber, getNotifications} from "./routes";
import models from "./models";

require("../../loadEnv")();

const app = express();

const jwt_user_password = expressJwt({secret: process.env.AUTH0_COURTBOT_CLIENT_SECRET});
const jwt_courtbot_api = expressJwt({secret: process.env.AUTH0_COURTBOT_SIGNING_CERT});

const localDevelopment = process.env.NODE_ENV !== 'production';
if (localDevelopment) {
    const options = {
        publicPath: `/public`,
        stats: {colors: true}
    };
    app.use(webpackDevMiddleware(webpack(webpackConfig), options));
}

app.use(logfmt.requestLogger());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const publicDir = path.join(__dirname, '../../public');
app.use(`/public`, express.static(publicDir));

app.get("/secured-stuff", jwt_user_password, (req, res) => res.send("Congrats!"));

app.get("/v1/case/:caseNumber", jwt_courtbot_api, getPeopleByCaseNumber);
app.get("/v1/case/:caseNumber/person/:personName", jwt_courtbot_api, getNotifications);

app.get("/people", (req, res) => {
    models.Person.findAll({
        include: [models.Person.Notifications],
    }).then(data => res.send(data))
});

app.get("/notifications", (req, res) => {
    models.Notification.findAll({include: [models.Person]})
        .then(data => res.send(data))
});

app.get('/*', (req, res) => res.sendFile(`${publicDir}/index.html`));

const port = Number(process.env.PORT || 5000);
app.listen(port, () => console.log("Listening on " + port));

export default app;
