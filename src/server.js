const { app } = require('./app');

// Models
const { Users } = require('./models/users');
const { Orders } = require('./models/order');
const { Petitions } = require('./models/petitions');
const { Storage } = require('./models/storage');
const { Products } = require('./models/products');

// Utils
const { db } = require('./DB/db');
const { Markets } = require('./models/market');

db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

// Establish model's relations
// 1 User <----> M Post
//has many
Users.hasMany(Orders, { foreignKey:'userId' });
Users.hasMany(Storage, { foreignKey: 'userId' });
Markets.hasMany(Products, { foreignKey: 'marketId' });
Markets.hasMany(Orders, { foreignKey: 'marketId' });
Orders.hasMany(Petitions,{ foreignKey:'orderId' });
Storage.hasMany(Products,{ foreignKey:'storageId' });

//belongs to
Orders.belongsTo(Users);
Orders.belongsTo(Markets);
Products.belongsTo(Storage);
Products.belongsTo(Markets);
Petitions.belongsTo(Orders);
Storage.belongsTo(Users);

//belongs to many
Users.belongsToMany(Markets,{
	foreignKey: 'userId',
	through:'usersInMarkets'
});
Markets.belongsToMany(Users,{
	foreignKey: 'marketId',
	through:'usersInMarkets'
});

db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

const port = process.env.PORT || 4001

app.listen(port, () => {
	console.log('Express app running!!');
});