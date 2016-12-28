export default (sequelize, DataTypes) => {
    const Person = sequelize.define('Person', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: DataTypes.STRING,
        phoneNumber: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                Person.Notifications = Person.hasMany(models.Notification);
            }
        }
    });

    return Person;
};
