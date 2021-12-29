const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "login_lecture",
});

connection.connect();

// connection.query(
//   "select * from users where id=?",
//   "kcm",
//   (error, results, fields) => {
//     if (error) throw error;
//     console.log("The First User is", results[0]);
//   }
// );

connection.beginTransaction((err2) => {
  connection.query(
    "update users set in_date=now() where id=?",
    ["kcm"],
    function (error, results, fields) {
      if (error) throw error;
      console.log("The Update", results.affectedRows);

      connection.query(
        "select * from users where id=?",
        ["cci"],
        function (error, results, fields) {
          if (error) throw error;
          console.log("The First User is: ", results[0]);

          connection.query(
            "delete from users where id=?",
            ["hello"],
            (error) => {
              if (error) throw error;
              connection.end();
            }
          );
        }
      );
    }
  );
});
