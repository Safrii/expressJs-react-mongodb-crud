const mongoose = require('mongoose');
const app = require('./app');

//database connection
const mongoDb = 'mongodb://localhost:27017/crud'
mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDb connection error:'));

//server connection
const port = 8080
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})