require("./loadEnv")();

const opts = {
    url: process.env.DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT,
    quoteIdentifiers: false, // case-insensitive tables and columns
    freezeTableName: true, // Disable plural table names, .e.g, "person" instead of "people"
    timestamps: false // Disable createdAt and updatedAt columns
};

module.exports = {
    development: opts,
    production: opts
};
