// import * as mysql from "mysql";
import * as mysql from "mysql-promise";

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "task",
//   password: "password"
// });
const db = mysql();

if (!db.isConfigured()) {
  db.configure({
    host: "localhost",
    user: "root",
    database: "task",
    password: "password"
  });
}

export default db;
