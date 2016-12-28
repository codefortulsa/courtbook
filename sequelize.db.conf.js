require("./loadEnv")();

const opts = {
    url: process.env.DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT,
    quoteIdentifiers: false,
    freezeTableName: true
};

module.exports = {
    development: opts,
    production: opts
};
