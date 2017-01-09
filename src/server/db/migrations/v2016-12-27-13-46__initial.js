module.exports = {
    up: function (queryInterface, Sequelize) {
        return createPerson(queryInterface, Sequelize)
            .then(createPersonNotification(queryInterface, Sequelize));
    },

    down: function (queryInterface) {
        queryInterface.dropTable("Notifications");
        queryInterface.dropTable("People");
    }
};

function createPerson(queryInterface, Sequelize) {
    return queryInterface.createTable("People", {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
}

function createPersonNotification(queryInterface, Sequelize) {
    return () => queryInterface.createTable("Notifications", {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        PersonId: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: "People",
                key: 'id'
            }
        }
    });
}
