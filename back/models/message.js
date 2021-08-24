const { dbConn , sql} = require("../config/db.config")

var Message = function (message) {
    this.message = message.message;
}


Message.create = function (newMessage, result){
    dbConn
    .input('Message', sql.VarChar(255), newMessage.message)
    .query(`INSERT INTO Messages (Message) values (@Message)`, function (err, res) {
        if(err){
            console.log("error:", err)
            return result(err, null)
        }
        else{
            return result(null, res.insertID)
        }
    })
}

Message.findAll = function(result) {
    dbConn.query('Select * from Messages', function(err, res){
        if (err) {
            console.log("error:", err)
            return result(err, null)
        } else {
            return result(null, res)
        }
    })
}

Message.findById = function(id, result) {
    dbConn
    .query(`Select * from Messages where id = ${id}`, function (err, res) {
        if (err) {
            console.log("error:", err)
            return result(err, null)
        } else {
            return result(null, res)
        }
    })
}

Message.update = function (id, message, result) {
    dbConn
    .input('Message', sql.VarChar(255), message.message)
    .input('id', sql.Int(), id)
    .query(`UPDATE messages SET Message = @Message WHERE id = @id`, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Message.patchUpdate = function (id, message, result) {
    for (const key in message) {
        if (Object.hasOwnProperty.call(message, key)) {
            dbConn
            .input('key',sql.VarChar(30), key )
            .input('value', sql.VarChar(30), message[key])
            .input('id', sql.Int(), id)
            .query(` UPDATE messages SET @key = @value  WHERE id = @id `, function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                } else {
                    result(null, res);
                }
            });
        }
    }
};


Message.delete = function (id, result) {
    dbConn
    .input('id', sql.Int(), id)
    .query(`DELETE FROM messages WHERE id = @id`, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Message
