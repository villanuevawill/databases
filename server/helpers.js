//Get Functions...

var isValueInDB = function(value, column, cb){

};

var insertIntoDB = function(value, column, cb){

};

var insertMessage = function(messageObj, cb){

};

var checkIfFinished = function(resolutions, property, cb){
  resolutions[property] = true;
  for (var key in resolutions){
    if (resolutions[key] === false){
      return;
    }
  }
  cb();
};

var addIfNotInDB = function(data, table, column, after){

   // helpers.isValueInDB(data.username, 'Users', 'username', function(userFound){
        //   if (userFound){
        //     helpers.checkIfFinished(isResolved, 'user', function(){
        //       helpers.insertMessage(data);
        //     });
        //   }else{
        //     helpers.insertIntoDB(data.username, 'Users', 'username', function(){
        //       helpers.checkIfFinished(isResolved, 'user', function(){
        //         helpers.insertMessage(data);
        //       });
        //     });
        //   }

};



