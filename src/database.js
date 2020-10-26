const mysql = require('mysql');

/* const mysqlConnection = mysql.createConnection({
  host: 'tecnolisis.com',
  user: 'EM3',
  password: 'hodguc-pugcih-8Menhy',
  database: 'TECNOLISLS_DB',
  multipleStatements: true,
  port: 3306,
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection; */


var db_config = {
  host: 'tecnolisis.com',
  user: 'EM3',
  password: 'hodguc-pugcih-8Menhy',
  database: 'TECNOLISLS_DB',
  multipleStatements: true,
  port: 3306
};

var mysqlConnection;

function handleDisconnect() {
  mysqlConnection = mysql.createPool(db_config); // Recreate the mysqlConnection, since
                                                  // the old one cannot be reused.

  mysqlConnection.getConnection(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } else {
      console.log('db is connected');
    }                                    // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  mysqlConnection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();
module.exports = mysqlConnection;
