export default {
    courtCase: function ({...values}={}) {
        return {
            id: this.integer() + "", // Postgres BIGINT exceed's JavaScript's Number.MAX_SAFE_INTEGER
            caseNumber: this.guid(),
            party: this.name(),
            ...values
        };
    },

    stakeholder: function ({courtCase = this.courtCase(), ...values}={}) {
        return {
            id: this.integer() + "", // Postgres BIGINT exceed's JavaScript's Number.MAX_SAFE_INTEGER
            courtCaseId: courtCase.id,
            name: this.name(),
            contact: this.phone(),
            contactType: this.pickone(["sms", "email", "phone call", "facebook", "twitter"]),
            ...values
        };
    },

    event: function ({courtCase = this.courtCase(), ...values}={}) {
        return {
            id: this.integer() + "", // Postgres BIGINT exceed's JavaScript's Number.MAX_SAFE_INTEGER
            courtCaseId: courtCase.id,
            date: this.date().toISOString(),
            description: this.sentence(),
            ...values
        }
    },

    reduxAction: function () {
        return {
            type: `TYPE_${this.word()}`.toUpperCase()
        }
    }
};
