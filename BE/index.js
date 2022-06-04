const express = require('express')
const Dao = require('./Dao')
const {expressjwt: jwt} = require("express-jwt");
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const saltRounds = 10
const secret = "secret"

const userRole = "user"
const adminRole = "admin"


const app = express()

app.use(express.json())

app.post('/signup', (req, res) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        amount: parseInt(req.body.amount),
        password: bcrypt.hashSync(req.body.password, saltRounds),
        role: userRole
    }
    Dao.addUser(user)
        .then(_ => res.sendStatus(200))
        .catch(err => console.error(err))
})

app.get('/user',
    jwt({secret: secret, algorithms: ["HS256"]}),
    (req, res) => {
        Dao.getUserByUsername(req.query.username)
            .then(user => res.status(200).send({
                username: user.username,
                role: user.role
            }))
            .catch(err => console.error(err))
    }
)

app.get('/users',
    jwt({secret: secret, algorithms: ["HS256"]}),
    (req, res) => {
        Dao.getAllUsers()
            .then(users => res.status(200).send(users.map(user => {
                return {
                    username: user.username,
                    amount: user.amount
                }
            })))
            .catch(err => console.error(err))
    }
)

app.put('/user',
    jwt({secret: secret, algorithms: ["HS256"]}),
    (req, res) => {
        Dao.updateUser(req.query.username, {
            amount: parseInt(req.body.amount)
        })
            .then(_ => res.sendStatus(200))
            .catch(err => console.error(err))
    }
)

app.delete('/user',
    jwt({secret: secret, algorithms: ["HS256"]}),
    (req, res) => {
        Dao.deleteUser(req.query.username)
            .then(_ => res.sendStatus(200))
            .catch(err => console.error(err))
    }
)

app.post('/user',
    jwt({secret: secret, algorithms: ["HS256"]}),
    (req, res) => {
        if (req.auth.role === adminRole) {
            const user = {
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: bcrypt.hashSync(req.body.password, saltRounds),
                role: userRole
            }
            Dao.addUser(user)
                .then(_ => res.sendStatus(200))
        } else {
            res.sendStatus(403)
        }
    })

app.post('/login', (req, res) => {
    Dao.getUserByUsername(req.body.username)
        .then(user => {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    res.status(200).send({
                        jwt: jsonwebtoken.sign({username: user.username, role: user.role}, secret),
                        user: user
                    })
                } else {
                    res.sendStatus(401)
                }
            }
        ).catch(err => console.error(err))
})


app.post('/transact',
    jwt({secret: secret, algorithms: ["HS256"]}),
    (req, res) => {
        Dao.getUserByUsername(req.auth.username)
            .then(user => {
                Dao.getUserByUsername(req.body.recipient)
                .then(recipient => {
                    const amount = parseInt(req.body.amount)
                
                    if (user !== null && user.amount >= amount && recipient !== null){
                        Dao.addTransaction({
                            time: Date.now(),
                            recipient: recipient.username,
                            sender: user.username,
                            amount: amount
                        })
    
                        Dao.updateUser(user.username, {
                            amount: user.amount - amount
                        })
                        Dao.updateUser(recipient.username, {
                            amount: recipient.amount + amount
                        })
    
                        res.sendStatus(200)
                    }
                    else{
                        res.sendStatus(400)
                    }
                })
                
            })
        
    }
)

app.get('/transactions',
    jwt({secret: secret, algorithms: ["HS256"]}),
    (req, res) => {
        Dao.getAllTransactions()
            .then(users => res.status(200).send(users))
            .catch(err => console.error(err))
    }
)

app.get('/deleteAll',
    jwt({secret: secret, algorithms: ["HS256"]}),
    (req, res) => {
        Dao.deleteAllUsers()
        Dao.deleteAllTransactions()
        
        res.sendStatus(200)
    }
)

app.listen(3000, () => console.log("Start..."))