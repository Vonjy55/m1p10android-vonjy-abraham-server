module.exports = {
    Article: class {
        constructor(id, titre, descr, contenu, date_pub, date_modif) {
            this.id = id;
            this.titre = titre;
            this.descr = descr;
            this.contenu = contenu;
            this.date_pub = date_pub;
            this.date_modif = date_modif;
        } 
    }
}

