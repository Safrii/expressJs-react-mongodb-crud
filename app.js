const express = require('express')

const employeeRouter = require('./routes/employeeRoutes');

const app = express();

//Middlewares
app.use(express.json());

//Routes
app.use('/api/', employeeRouter);

module.exports = app;