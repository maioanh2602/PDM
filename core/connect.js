var mysql = require('mysql');

// Add the credentials to access your database
var connection = mysql.createConnection({ 
    host     : 'hcmiuiot.tech',
    user     : 'root',
    password :  'rootpw', 
    database : 'library_schema'
}); //Unchangable