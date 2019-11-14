const Db = require("./Db");

const User = Db.sequelize.define('user', 
    {
        // attributes
        name: {
            type: Db.Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Db.Sequelize.STRING,
            allowNull: false
            // allowNull defaults to true
        },
        email: {
            type: Db.Sequelize.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false,
    }
);

module.exports = User;