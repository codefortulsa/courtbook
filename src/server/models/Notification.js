export default (sequelize, DataTypes) => {
    const Notification = sequelize.define("Notification", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        date: DataTypes.DATE
    }, {
        classMethods: {
            associate: function (models) {
                Notification.belongsTo(models.Person);
            }
        }
    });

    return Notification;
};
