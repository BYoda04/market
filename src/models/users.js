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
    number: {
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
        allowNull: false
    },
    suscription: {
        type: DataTypes.STRING,
        allowNull: false,
		defaultValue: 'free',
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
		defaultValue: 'active',
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
		defaultValue: 'client',
    }
});

module.exports = {
    Users
};
