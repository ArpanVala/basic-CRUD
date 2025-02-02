let { MongoClient} = require("mongodb")

const url = 'mongodb://127.0.0.1:27017'

const client =new MongoClient(url)

const connection = async ()=>{
    await client.connect();
    const db=  client.db("demoDB")
    return db;
}

module.exports = connection