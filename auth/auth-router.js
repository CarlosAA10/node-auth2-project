const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const router = require("express").Router();

const Users = require("../users/users-model.js");
const { isValid } = require("../users/users-middleware.");
const configVars = require('../config/vars'); 

router.post('/register', (req,res) => {
    const credentials = req.body; 

    if(isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 14; 

        const hash = bcryptjs.hashSync(credentials.password, rounds); 

        credentials.password = hash; 

        Users.add(credentials)
            .then(user => {
                res.status(201).json({ data: user })
            })
            .catch(err => {
                res.status(500).json({ message: err.message }); 
            })
    } else {
        res.status(400).json({
            message: "Please provide a username and password!"
        })
    }
})

router.post('/login', (req,res) => {
    const { username , password } = req.body; 

    if(isValid(req.body)) {
        Users.findBy({ username: username })
            .then(([user]) => {
                if(user && bcryptjs.compareSync(password, user.password)){
                    const token = createToken(user); 

                    res.status(200).json({ message: "Welcome to my API User", token})
                } else {
                    res.status(401).json({ message: "invalid credentials" })
                }
            })
            .catch(err => {
                res.status(500).json({ message: err.message }); 
            }); 
    } else {
        res.status(400).json({
            message: "Please provide username and password"
        })
    }
})

function createToken(user) {
    const payload = {
        sub: user.id, 
        username: user.username, 
        role: user.role
    }; 
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, configVars.jwtSecret, options); 
}
module.exports = router; 