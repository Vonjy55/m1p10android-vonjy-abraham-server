const fs = require('fs');
const path = require('path');
const multer = require('multer');
const recordRoutes = require('express').Router()

const articleDb = require('../db/articles-db')
const sharp = require('sharp')

// let { AllUsers, Client} = require('../utils/role')

// const checkJwt = require('../middlewares/checkJwt')
// const checkRole = require('../middlewares/checkRole')

const baseRoute = '/api/article'

const articleCoverName = `article-cover.webp`;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

recordRoutes.get(`${baseRoute}/:id/cover`, async function(req, res) {
    res.sendFile(path.join(process.cwd(), process.env.MEDIA_DIR, "article",req.params.id, articleCoverName));
});

recordRoutes.post(baseRoute, upload.single('cover'), async function(req, res) {

    const article = {
        titre: req.body.titre,
        descr: req.body.descr,
    }
    articleDb.saveNew(article)
        .then((result) => {
            const targetPath = path.join(process.cwd(), process.env.MEDIA_DIR, "article", `${result.lastInsertRowid}`);

            fs.mkdir(targetPath, { recursive: true }, (error, _) => {
                sharp(req.file.buffer)
                    .resize(parseInt(process.env.ARTICLE_COVER_WIDTH))
                    .webp() // ovay jpg() raha tsy mandeha am android
                    .toFile(path.join(targetPath,articleCoverName))
                    .then(_ => {

                        req.file.buffer = null;
                        res.json(result);

                    })
                    .catch(error => {
                        console.error(error);
                        throw error;
                    });
            });
        })
        .catch((err) => {
            console.log('Erreur ' + err);
            console.log(err);
            return res.status(500).send("Erreur lors de l'insertion de l'article!")
        });

}, async (req, res) => res.json(req.result));

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
