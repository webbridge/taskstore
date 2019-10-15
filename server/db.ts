import * as mysql from "mysql-promise";

const db = mysql();

db.configure({
  host: "db",
  port: "3306",
  user: "test",
  database: "task",
  password: "test"
});

export default db;
