const dotenv = require('dotenv');

module.exports = function () {
    return dotenv.config({silent: process.env.NODE_ENV === 'production'});
};
