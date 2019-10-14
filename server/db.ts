import * as mysql from "mysql-promise";

const db = mysql();

db.configure({
  host: "localhost",
  port: "3306",
  user: "root",
  database: "task",
  password: "password"
});

export default db;
