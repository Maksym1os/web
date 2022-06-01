const express = require('express')
const Database = require('./Database')

const app = express()

app.use(express.json())


app.post('/addOne', (req, res) => {
    Database.addOne(req.body).then(_ => res.sendStatus(200))
        .catch(err => console.error(err))
})

app.post('/addMany', (req, res) => {
    Database.addMany(req.body).then(_ => res.sendStatus(200))
        .catch(err => console.error(err))
})

app.get('/', (req, res) => {
    Database.getAll()
        .then(elems => elems.flat())
        .then(elems => elems.filter(elem => (elem.timestamp > req.query.from && elem.timestamp < req.query.to)))
        .then(a => a.filter(b => (b.appId === req.query.appId)))
        .then(a => a.filter(b => (b.userId === req.query.userId)))
        .then(records => res.status(200).json(records))
        .catch(err => console.error(err))
})

app.listen(3000,() => console.log("Start..."))