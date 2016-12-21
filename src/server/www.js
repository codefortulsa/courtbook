import express from "express";
import bodyParser from "body-parser";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import logfmt from "logfmt";
import path from "path";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpack from "webpack";
import webpackConfig from "../../webpack.config";
import passport from "./auth/auth";

const app = express();

const localDevelopment = process.env.NODE_ENV !== 'production';
if (localDevelopment) {
    const options = {
        publicPath: `/public`,
        stats: {colors: true}
    };
    app.use(webpackDevMiddleware(webpack(webpackConfig), options));
}

app.use(logfmt.requestLogger());
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

const publicDir = path.join(__dirname, '../../src/public');
app.use(`/public`, express.static(publicDir));

app.post('/login',
    passport.authenticate('local', {failureRedirect: '/fail'}),
    (req, res) => res.redirect('/woot'));

app.get('/*', (req, res) => res.sendFile(`${publicDir}/index.html`));

const port = Number(process.env.PORT || 5000);
app.listen(port, () => console.log("Listening on " + port));

export default app;
