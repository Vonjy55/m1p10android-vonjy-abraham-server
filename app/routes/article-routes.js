const bodyParser = require('body-parser')

const recordRoutes = require('express').Router()

const articleDb = require('../db/articles-db')

// let { AllUsers, Client} = require('../utils/role')

// const checkJwt = require('../middlewares/checkJwt')
// const checkRole = require('../middlewares/checkRole')

const baseRoute = '/api/article'

//inscription
recordRoutes.route(`${baseRoute}`).post(async function(req, res) {
    //TODO:Vérifier les champs

    const article = {}
    articleDb.saveOne(article)
        .then((result) => res.json(result))
        .catch((err) => {
            console.log('Erreur ' + err);
            console.log(err.errInfo);
            return res.status(400).send("Erreur lors de l'insertion de l'article!")
        });
});

recordRoutes.get(`${baseRoute}/:id`, /* checkJwt, checkRole(Client), */(req, res) => {

    articleDb.findOneById(req.params.id)
        .then(articles => {
            if (articles.rows.length === 0) {
                throw new Error(`Pas d'articles avec l'id ${req.params.id}`);
            }
            res.status(200).json(
                articles.rows[0]
            );
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({
                message: 'failed',
            });
        });

});

recordRoutes.get(`${baseRoute}`, /* checkJwt, checkRole(Client), */(req, res) => {

    let query;

    if (req.query["s"]) {
        query = articleDb.findOne(req.query["s"]);
    } else {
        query = articleDb.getAll();
    }

    query.then((articles) => {
        res.status(200).json(
            articles.rows
        );
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({
            message: 'failed',
        });
    });

});

module.exports = recordRoutes;
