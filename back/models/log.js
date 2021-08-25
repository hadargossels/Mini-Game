const { dbConn , sql} = require("../config/db.config")

var Log = function (log) {
    this.id = log.id;
    this.ip = log.ip;
    this.action = log.action;
    this.dateTime = log.dateTime;
}

Log.create = function (newLog, result){
    for (let i = 0; i < newLog.length; i++) {
        dbConn.request()
        .input('ID', sql.Int(), newLog[i].id)
        .input('IP', sql.VarChar(255), newLog[i].ip)
        .input('ACTION', sql.VarChar(255), newLog[i].action)
        .input('DateTime', sql.DateTime(), newLog[i].dateTime)
        .query(`INSERT INTO Log (ID, IP, ACTION, DateTime) values (@ID,@IP,@ACTION,@DateTime)`)
        // , function (err, res) {
        //     if(err){
        //         console.log("error:", err)
        //         return result(err, null)
        //     }
        //     else{
        //         return result(null, res)
        //     }
        // }
        
    }

}

Log.findAll = function(result) {
    dbConn.query('Select * from Log', function(err, res){
        if (err) {
            console.log("error:", err)
            return result(err, null)
        } else {
            return result(null, res)
        }
    })
}

Log.findById = function(id, result) {
    dbConn
    .query(`Select * from Logs where id = ${id}`, function (err, res) {
        if (err) {
            console.log("error:", err)
            return result(err, null)
        } else {
            return result(null, res)
        }
    })
}

Log.update = function (id, log, result) {
    dbConn.request()
    .input('Log', sql.VarChar(255), log.log)
    .input('id', sql.Int(), id)
    .query(`UPDATE logs SET Log = @Log WHERE id = @id`, function (err, res) {
        if (err) {
            console.log("error: ", err);
            return result(null, err);
        } else {
            return result(null, res);
        }
    });
};

Log.patchUpdate = function (id, log, result) {
    for (const key in log) {
        if (Object.hasOwnProperty.call(log, key)) {
            dbConn.request()
            .input('key',sql.VarChar(30), key )
            .input('value', sql.VarChar(30), log[key])
            .input('id', sql.Int(), id)
            .query(` UPDATE logs SET @key = @value  WHERE id = @id `, function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    return result(null, err);
                } else {
                    return result(null, res);
                }
            });
        }
    }
};


Log.delete = function (id, result) {
    dbConn.request()
    .input('id', sql.Int(), id)
    .query(`DELETE FROM logs WHERE id = @id`, function (err, res) {
        if (err) {
            console.log("error: ", err);
            return result(null, err);
        } else {
            return result(null, res);
        }
    });
};

module.exports = Log
