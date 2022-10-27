const mongoose = require('mongoose');

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

let connString = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/?retryWrites=true&w=majority`;
console.log(connString);

class dbConnect {
  constructor() {
    mongoose.connect(connString, {
      dbName: DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.mongodb = mongoose.connection;
  }
}

module.exports = new dbConnect();
