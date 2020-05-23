var mysql = require("mysql");

// Add the credentials to access your database
var connection = mysql.createConnection({
    host: "206.189.90.18",
    port: 13306,
    user: "root",
    password: "rootpw",
    database: "Library",
}); //Unchangable