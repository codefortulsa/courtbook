import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import logfmt from "logfmt";
import path from "path";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpack from "webpack";
import webpackConfig from "../../webpack.config";
import v1Router from "./v1Router";
import authMiddleware from "./auth-middleware";


require("../../loadEnv")();

const app = express();

const localDevelopment = process.env.NODE_ENV !== 'production';
if (localDevelopment) {
    const options = {
        publicPath: `/public`,
        stats: {colors: true},
        noInfo: true
    };
    app.use(webpackDevMiddleware(webpack(webpackConfig), options));
}

app.use(logfmt.requestLogger());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const publicDir = path.join(__dirname, '../../public');
app.use(`/public`, express.static(publicDir));

app.use("/rest", authMiddleware, v1Router);

app.get('/*', (req, res) => res.sendFile(`${publicDir}/index.html`));

const port = Number(process.env.PORT || 5000);
app.listen(port, () => console.log("Listening on " + port));

export default app;
