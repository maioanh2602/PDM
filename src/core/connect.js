var mysql = require("mysql");

// Add the credentials to access your database
var connection = mysql.createConnection({
    host: "hcmiuiot.tech",
    port: 13306,
    user: "root",
    password: "rootpw",
    database: "Library",
}); //Unchangable

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
