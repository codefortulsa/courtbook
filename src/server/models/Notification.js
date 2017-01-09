export default (sequelize, DataTypes) => {
    const Notification = sequelize.define("Notification", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        date: DataTypes.DATE
    }, {
        classMethods: {
            associate: function (models) {
                Notification.belongsTo(models.Person, {as: "person"});
            }
        }
    });

    return Notification;
};
