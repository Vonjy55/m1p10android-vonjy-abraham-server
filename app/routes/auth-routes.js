const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const recordRoutes = require('express').Router()

const userDb = require('../db/users-db')
const { User } = require('../models/user')

let { AllUsers, Client} = require('../utils/role')

const checkJwt = require('../middlewares/checkJwt')
const checkRole = require('../middlewares/checkRole')

const baseRoute = '/api/auth'

//inscription
recordRoutes.route(`${baseRoute}/inscription`).post(async function(req, res) {
    //TODO:Vérifier les champs

    //Crypter le mot de passe
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User(
            req.body.nom,
            req.body.prenom,
            hash,
            req.body.email,
            req.body.telephone,
            req.body.adresse,
            req.body.role || "Client"
        );
        userDb.saveOne(user)
            .then((result) => res.json(result))
            .catch((err) => {
                console.log('Erreur ' + err);
                console.log( err.errInfo);
                return res.status(400).send("Erreur lors de l'insertion de l'utilisateur!")
            })
    })
})

//login
recordRoutes.route(`${baseRoute}/login`).post((req, res) => {
    let getUser
    userDb
        .findOne(
            req.body.email
        )
        .catch((err) => {  
            console.log(err)          
            throw new Error(`Erreur lors de la recherche de l'email '${req.body.email}'`)
        })
        .then((user) => {
            if (!user) {
                throw new Error(`Pas de mail correspondant à '${req.body.email}'`)
            }
            getUser = user[0]

            return bcrypt.compare(req.body.password, user[0].password)
        })
        .then((response) => {
            if (!response) {
                throw new Error(`Erreur lors de la comparaison des MdP`)
            }
            let jwtToken = jwt.sign({
                    name: getUser.nom,
                    userId: getUser.id,
                },
                process.env.JWT_TOKEN_SECRET, {
                    expiresIn: '1h',
                },
            )
            console.log("login ok");
            return res.status(200).json({
                token: jwtToken,
                expiresIn: 3600,
                id: getUser.id,
                role: getUser.role
            })
        })
        .catch((err) => {
            res.status(401).json({
                message: 'Authentication failed',
            })
            console.error(err);
        })
})


recordRoutes.get('/api/auth/allUser', (req, res) => {

    userDb.getAll()
        .then((user) => {
            console.log(user);
            if (!user) {
                return res.status(401).json({
                    message: 'Authentification échouée',
                })
            }
            res.status(200).json({
                users: user
            })
        }).catch((err) => {
            return res.status(401).json({
                message: 'failed',
            })
        })
})
module.exports = recordRoutes;