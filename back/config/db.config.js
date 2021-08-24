const sql = require('mssql')
require("dotenv").config()


const config = {
    user: 'sa',
    password: process.env.SQLSERVER_SA_PASS,
    server: 'localhost',
    database: 'MiniGame',
    options: {
        encrypted: true,
        enableArithAbort: true,
        trustServerCertificate: true
    }
}

const db = sql.connect(config, (err) => {

    if (err) console.log(err);

    console.log("Database Connected!");

})


module.exports = {
    dbConn: db,
    sql
}
