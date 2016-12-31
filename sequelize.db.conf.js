require("./loadEnv")();

const opts = {
    url: process.env.DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT,
    timestamps: false // Disable createdAt and updatedAt columns
};

module.exports = {
    development: opts,
    production: opts
};
