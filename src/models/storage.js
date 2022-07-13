const { db, DataTypes } = require('../DB/db');

//Model table
const Storage = db.define('storage', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    }
});

module.exports = {
    Storage
};