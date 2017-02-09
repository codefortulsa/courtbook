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
    },
    stakeholders: function() {
        return this.belongsToMany(Stakeholder, "stakeholders", "courtCaseId");
    }
});

export const CourtCaseEvent = bookshelf.Model.extend({
    tableName: 'courtCaseEvents',
    courtCase: function() {
        return this.hasOne(CourtCase, "id", "courtCaseId")
    }
});

export const Stakeholder = bookshelf.Model.extend({
    tableName: 'stakeholders',
    courtCase: function() {
        return this.hasOne(CourtCase, "id", "courtCaseId")
    }
});
