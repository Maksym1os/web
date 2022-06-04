const MongoClient = require('mongodb').MongoClient
const articlePosted = "posted"
const articleEdited = "edited"

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


    addUser = record => this.ifConnected(db => db.collection('user').insertOne(record))

    updateUser = (username, fieldToUpdate) => this.ifConnected(db => db.collection('user').updateOne({username},
        {$set: fieldToUpdate}
    ))

    deleteUser = username => this.ifConnected(db => db.collection('user').findOneAndDelete({username}))

    deleteAllUsers = _ => this.ifConnected(db => db.collection('user').deleteMany({}))
    deleteAllTransactions = _ => this.ifConnected(db => db.collection('transactions').deleteMany({}))

    getUserByUsername = username => this.ifConnected(db => db.collection('user').findOne({username: username}))

    getAllUsers = () => this.ifConnected(db => db.collection('user').find({}).toArray())

    getAllTransactions = () => this.ifConnected(db => db.collection('transactions').find({}).toArray())

    ifConnected = dbAction => this.dbConnection ? this.dbConnection.then(dbAction) : Promise.reject('not connected')

    addTransaction = record => this.ifConnected(db => db.collection('transactions').insertOne(record))

}

module.exports = new Dao()