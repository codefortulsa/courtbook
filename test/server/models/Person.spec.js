import models from "../../../src/server/models/index";

describe("Person", function () {
    it("should save person", function () {
        const person = {
            name: chance.name(),
            phoneNumber: chance.phone(),
            notifications: [
                {date: new Date()}
            ]
        };

        return models.Person.create(person, {
            include: [
                {model: models.Notification, as: "notifications"}
            ]
        }).then((actual) => {
            expect(actual.id).to.exist();
            expect(actual.name).to.equal(person.name);
            expect(actual.phoneNumber).to.equal(person.phoneNumber);
            expect(actual.notifications).to.exist();
            expect(actual.notifications).to.have.length(1);
            const actualNotification = actual.notifications[0];
            expect(actualNotification.date + "").to.equal(person.notifications[0].date + "");
            expect(actualNotification.PersonId).to.eql(actual.id);
        });
    });
});
