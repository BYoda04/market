const { db, DataTypes } = require('../DB/db');

//Model table
const Users = db.define('users', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pass123'
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
		defaultValue: 'active',
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
		defaultValue: 2,
    }
});

module.exports = {
    Users
};
