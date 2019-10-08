import * as mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "task",
  password: "password"
});

connection.connect((err) => {
  if (err) throw err;
  console.log("DB Connected");
});

export default connection;
