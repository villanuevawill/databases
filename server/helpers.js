var db = require('../SQL/db.js').dbConnection;

exports.isValueInDB = isValueInDB = function(value, table, column, callback){
  db.query('SELECT COUNT(*) from '+table+' where '+column+' = '+value, function(err, rows){
    if(err){
      throw err;
    }
    console.log(rows);
    callback(rows[0]['property'] > 1);  //Don't forget to add property!!!
  });
};

exports.insertIntoDB = insertIntoDB = function(value, table, column, callback){
  db.query('INSERT INTO '+table+' ('+column+') VALUES ('+value+')', function(err){
    if (err){
      throw err;
    }
    callback();
  });
};

exports.insertMessage = insertMessage = function(messageObj, cb){
  db.query('INSERT INTO Messages (text, id_Room, id_User) VALUES (?, (SELECT id from Rooms where roomname = ?), (SELECT id from Users where username = ?))',
    [messageObj.text, messageObj.roomname, messageObj.username], function(err, result){
      if (err){
        throw err;
      }
      cb(result.insertId);
  });
};

exports.checkIfFinished = checkIfFinished = function(resolutions, property, cb){
  resolutions[property] = true;
  for (var key in resolutions){
    if (resolutions[key] === false){
      return;
    }
  }
  cb();
};

exports.addIfNotInDB = addIfNotInDB = function(data, table, column, after){
  isValueInDB(data, table, column, function(found){
    if (found){
      after();
    }else{
      insertIntoDB(data, table, column, function(){
        after();
      });
    }
  });
};



