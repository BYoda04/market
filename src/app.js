require('dotenv').config()
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// Routers
const { rolesRouter } = require('./routes/roles.routes');
const { usersRouter } = require('./routes/users.routes');

// Global err controller
const { globalErrorHandler } = require('./utils/globalErrorHandler');

// Utils
const { AppError } = require('./utils/appError');

// Init express app
const app = express();

app.use(cors());
app.use(express.json());
app.use('/',express.static(path.join(__dirname,'storage')));

// Limit the number of requests that can be accepted to our server
const limiter = rateLimit({
	max: 10000,
	windowMs: 60 * 60 * 1000, // 1 hr
	message: 'Number of requests have been exceeded',
});

app.use(limiter);

//add security headers
app.use(helmet());

//compress response
app.use(compression());

//morgan
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

// Define endpoints
app.use('/api/v1/roles', rolesRouter);
app.use('/api/v1/users', usersRouter);

// Handle incoming unknown routes to the server
app.all('*', (req, res, next) => {
	next(
		new AppError(
			`${req.method} ${req.originalUrl} not found in this server`,
			404
		)
	);
});

app.use(globalErrorHandler);

module.exports = { app };