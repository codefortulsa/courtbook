module.exports = {
    up: function (queryInterface, Sequelize) {
        return createPerson(queryInterface, Sequelize)
            .then(createPersonNotification(queryInterface, Sequelize));
    },

    down: function (queryInterface) {
        queryInterface.dropTable("notification");
        queryInterface.dropTable("person");
    }
};

function createPerson(queryInterface, Sequelize) {
    return queryInterface.createTable("person", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
}

function createPersonNotification(queryInterface, Sequelize) {
    return () => queryInterface.createTable("notification", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        personId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: "Person",
                key: 'id'
            }
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
}
