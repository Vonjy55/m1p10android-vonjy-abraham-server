
const client_local = require('../config/connection').client_local()

module.exports = {
    saveOne: async function (user,options) {
        return user;
    },
    findOneById: async function(id) {
        return  client_local.execute("select * from example_users where id = "+id);
    },
    getAll: async function() {
        return client_local.execute("select * from example_users");
    }
}