// const { User } = require('../models/user');

const client_local = require('../config/connection').client_local


module.exports = {
    saveOne: async function (user,options) {
        console.log(user);
        return client_local.execute({sql:"insert into users(nom,prenom,password,email,telephone,adresse,role) values(?,?,?,?,?,?,?)",args:[user.nom,user.prenom,user.password,user.email,user.telephone,user.adresse,user.role]});
    },
    findOneById: async function(id) {
        return  client_local.execute({sql:"select * from users where id = ?",args:[id]});
    },
    findOne: async function(email) {
        return  client_local.execute({sql:"select * from users where email = ?",args:[email]});
    },
    getAll: async function() {
        return client_local.execute("select * from users");
    }
}