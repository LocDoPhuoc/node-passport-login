const Sequelize = require("sequelize");

// DB config
const config = require("../configs/db");

// Connect to db by Sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.driver
});

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
}




