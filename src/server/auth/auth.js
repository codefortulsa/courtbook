import _ from "lodash";
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = [
    {id: 1, name: "Ash Lux", username: "ashlux", password: "password"},
    {id: 2, name: "Zoe Lux", username: "zoelux", password: "pass123"}
];

const User = {
    findById: (id, cb) => cb(null, _.find(users, {id})),
    findByUsername: (username, cb) => cb(null, _.find(users, {username}))
};

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findByUsername(username, function (err, user) {
            if (err) {
                console.info(err);
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if (user.password !== password) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

export default passport;