import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DATABSE_URL, {});
