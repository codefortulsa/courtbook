require("./loadEnv")();

module.exports = {
    development: {
        url: process.env.DATABASE_URL,
        dialect: process.env.DATABASE_DIALECT
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: process.env.DATABASE_DIALECT
    }
};
