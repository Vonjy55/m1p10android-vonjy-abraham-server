
const client_local = require('../config/connection').client_local


module.exports = {

    save: async function(article) {
        if (article.id){
            return client_local.execute(
                {
                    sql: "update articles set titre = ? , descr = ?, contenu = ?, video = ?,longitude = ?, latitude = ?, date_modif = datetime('now') where id = ?",
                    args: [article.titre, article.descr, article.contenu, article.video, article.longitude, article.latitude, article.id]
                });
        }
        return client_local.execute(
            {
                sql: "insert into articles(titre, descr, contenu, video,longitude, latitude, date_pub, date_modif) values(?,?,?, ?,?,?, datetime('now'),datetime('now'))",
                args: [article.titre, article.descr, article.contenu, article.video, article.longitude, article.latitude]
            });
    },

    findOneById: async function(id) {
        return client_local.execute({ sql: "select id, titre, descr, contenu, video, date_pub, date_modif, longitude, latitude from articles where id = ?", args: [id] });
    },
    findOne: async function(titre) {
        return client_local.execute({ sql: "select id, titre, descr, date_pub, date_modif, longitude, latitude from articles where titre like '%' ||  :titre || '%'", args: { titre: titre } });
    },
    getAll: async function() {
        return client_local.execute("select id, titre, descr, date_pub, date_modif, longitude, latitude from articles");
    },

    getAllFull: async function() {
        return client_local.execute("select id, titre, descr, date_pub, date_modif, longitude, latitude, video, contenu from articles");
    },
    getVilles: async function() {
        return client_local.execute("select id, nom, longitude, latitude from villes");
    },
}
