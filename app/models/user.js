module.exports = {
    User: class {
        constructor(nom, prenom, password, email, telephone, adresse, role) {
            this.nom = nom;
            this.prenom = prenom;
            this.password = password;
            this.email = email;
            this.telephone = telephone;
            this.adresse = adresse;
            this.role = role;
        }
    }
}