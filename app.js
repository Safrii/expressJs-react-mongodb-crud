const express = require('express');
const cors = require('cors');

const employeeRouter = require('./routes/employeeRoutes');

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/', employeeRouter);

module.exports = app;