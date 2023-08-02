// config/connection.js
const { createClient } = require('@libsql/client');
require('dotenv').config();

const client_local = createClient({
  url: process.env.TURSO_DB_URL || process.env.LOCAL_DB_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

module.exports = {
  client_local,
};
