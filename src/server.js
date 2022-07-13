const { app } = require('./app');

// Models
const { Users } = require('./models/users');
const { Orders } = require('./models/order');
const { Petitions } = require('./models/petitions');
const { Storage } = require('./models/storage');
const { Products } = require('./models/products');
const { Roles } = require('./models/roles');

// Utils
const { db } = require('./DB/db');

db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

// Establish model's relations
// 1 User <----> M Post
//has many
Users.hasMany(Orders,{ foreignKey:'userId' });
Roles.hasMany(Users,{ foreignKey:'roleId' });
Orders.hasMany(Petitions,{ foreignKey:'orderId' });
Storage.hasMany(Products,{ foreignKey:'storageId' });

//belongs to
Users.belongsTo(Roles);
Orders.belongsTo(Users);
Products.belongsTo(Storage);
Petitions.belongsTo(Orders);

//belongs to many

db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

const port = process.env.PORT || 4001

app.listen(port, () => {
	console.log('Express app running!!');
});