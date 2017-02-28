export default {
    courtCase: function () {
        return {
            id: this.integer(),
            caseNumber: this.guid(),
            party: this.name()
        };
    },

    stakeholder: function (courtCase=this.courtCase()) {
        return {
            id: this.integer(),
            courtCaseId: courtCase.id,
            name: this.name(),
            contact: this.phone(),
            contactType: this.pickone(["sms", "email", "phone call", "facebook", "twitter"]),
            courtCase
        };
    },

    event: function(courtCase=this.courtCase()) {
        return {
            id: this.integer(),
            courtCaseId: courtCase.id,
            date: this.date().toString(),
            description: this.sentence(),
            courtCase
        }
    }
};
