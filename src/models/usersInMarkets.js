const { db, DataTypes } = require('../DB/db');
const { Users } = require('./users');
const { Markets } = require('./market');

//Model table
const UsersInMarkets = db.define('usersInMarkets', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    marketId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Markets,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
		defaultValue: 'active',
    }
});

module.exports = {
    UsersInMarkets
};