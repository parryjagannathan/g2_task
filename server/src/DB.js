const DB = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "",
    database: "g2_client",
    port: 5432,
  },
  pool: { min: 0, max: 15 },
});
module.exports = { DB };
