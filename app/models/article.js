module.exports = {
    Article: class {
        constructor(id, titre, descr, date_pub, date_modif) {
            this.id = id;
            this.titre = titre;
            this.descr = descr;
            this.date_pub = date_pub;
            this.date_modif = date_modif;
        } 
    }
}

