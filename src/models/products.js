const { db, DataTypes } = require('../DB/db');

//Model table
const Products = db.define('products', {
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
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
		defaultValue: 'active',
    },
    storageId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = {
    Products
};