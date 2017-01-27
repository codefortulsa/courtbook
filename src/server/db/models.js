import Knex from 'knex';
import Bookshelf from 'bookshelf';

const knex = Knex({
    client: 'postgres',
    connection: process.env.DATABASE_URL,
    debug: true
});

const bookshelf = Bookshelf(knex);

export const CourtCase = bookshelf.Model.extend({
    tableName: 'courtCases',
    courtCaseEvents: function() {
        return this.belongsToMany(CourtCaseEvent, "courtCaseEvents", "courtCaseId");
    }
});

export const CourtCaseEvent = bookshelf.Model.extend({
    tableName: 'courtCaseEvents'
});
