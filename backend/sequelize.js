const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("customers", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
