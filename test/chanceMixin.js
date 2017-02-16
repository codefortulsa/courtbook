export default {
    courtCase: function () {
        return {
            id: this.integer(),
            caseNumber: this.guid(),
            party: this.name()
        };
    },

    stakeholder: function () {
        return {
            id: this.integer(),
            courtCaseId: this.integer(),
            name: this.name(),
            contact: this.phone(),
            contactType: this.pickone(["sms", "email", "phone call", "facebook", "twitter"])
        };
    },

    event: function() {
        return {
            id: this.integer(),
            courtCaseId: this.integer(),
            date: this.date().toString(),
            description: this.sentence()
        }
    }
};
