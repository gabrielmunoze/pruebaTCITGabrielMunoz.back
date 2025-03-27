const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("testTCITGabrielMunoz", "postgres", "123456", {
  host: "localhost",
  dialect: "postgres",
  logging: false, // Para evitar logs en la consola
});

module.exports = sequelize;
