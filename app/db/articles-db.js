
const client_local = require('../config/connection').client_local


module.exports = {

    saveOne: async function(user) {
        console.log(user);
        return client_local.execute({ sql: "insert into articles(nom,prenom,password,email,telephone,adresse,role) values(?,?,?,?,?,?,?)", args: [user.nom, user.prenom, user.password, user.email, user.telephone, user.adresse, user.role] });
    },

    saveNew: async function(article) {
        return client_local.execute(
            {
                sql: "insert into articles(titre, descr, contenu, video, date_pub, date_modif) values(?,?,?, ?, datetime('now'),datetime('now'))",
                args: [article.titre, article.descr, article.contenu, article.video]
            });
    },

    findOneById: async function(id) {
        return client_local.execute({ sql: "select id, titre, descr, contenu, video, date_pub, date_modif from articles where id = ?", args: [id] });
    },
    findOne: async function(titre) {
        return client_local.execute({ sql: "select id, titre, descr, date_pub, date_modif from articles where titre like '%' ||  :titre || '%'", args: { titre: titre } });
    },
    getAll: async function() {
        return client_local.execute("select id, titre, descr, date_pub, date_modif from articles");
    },

    getVilles: async function() {
        return client_local.execute("select id, nom, longitude, latitude from villes");
    },
}
