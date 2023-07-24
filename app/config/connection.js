const createClient = require('@libsql/client')
require('dotenv').config()

const client_local = 
	function (callback){
		createClient({
			// file:/// na file:/ ny manomboka azy
			url:process.env.LOCAL_DB_URL
	})
};

module.exports = {
    client_local
}