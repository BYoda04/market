const { db, DataTypes } = require('../DB/db');

//Model table
const Markets = db.define('markets', {
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
    suscription: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'free'
    },
    onlinePayment: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
		defaultValue: 'active',
    }
});

module.exports = {
    Markets
};