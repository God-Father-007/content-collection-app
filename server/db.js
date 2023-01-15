const { MongoClient } = require('mongodb');
require('dotenv').config();

let dbObject

let uri = process.env.DATABASE_URI;

module.exports = {
    connectToDb: (callback) => {
        MongoClient.connect(uri)
        .then((client) => {
            dbObject = client.db("all_content");
            callback();
        })
        .catch((err) => {
            console.log(err);
            callback(err);
        });
    },
    getDb: () => dbObject
}