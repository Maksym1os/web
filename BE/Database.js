const MongoClient = require('mongodb').MongoClient

class Dao {

    dbConnection = null

    constructor() {
        this.connect()
    }

    connect = () => {
        this.dbConnection = new Promise((resolve, reject) => {
            const client = new MongoClient('mongodb+srv://root:kyx3cX5HwjDEBHPY@cluster0.cufld.mongodb.net/mydb1?retryWrites=true&w=majority'
                , {useNewUrlParser: true, useUnifiedTopology: true})
            client.connect()
                .then(() => client.db('mydb1'))
                .then(db => resolve(db))
                .catch(reject);
        })
    }

    addOne = record => this.ifConnected(db => db.collection('collection').insertOne(record))

    addMany = records => this.ifConnected(db => db.collection('collection').insertMany(records))

    getAll = () => this.ifConnected(db => db.collection('collection').find({}).toArray())

    ifConnected = dbAction => this.dbConnection ? this.dbConnection.then(dbAction) : Promise.reject('not connected')

}

module.exports = new Dao()