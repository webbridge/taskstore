import * as mysql from "mysql-promise";

const db = mysql();

db.configure({
  host: "localhost",
  port: "3306",
  user: "test",
  database: "task",
  password: "test"
});

export default db;
