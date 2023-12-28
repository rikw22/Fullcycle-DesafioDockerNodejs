const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bindAddress = process.env.BIND_ADDRESS || "0.0.0.0";
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);

const sqlCreate = `CREATE TABLE IF NOT EXISTS people (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) DEFAULT NULL,
    PRIMARY KEY (id)
  ) `;
connection.query(sqlCreate);


app.get("/", (req, res) => {
    const sqlInsert = `INSERT INTO people(name)  values('Ricardo')`;
    connection.query(sqlInsert);

    let html = "<h1>Full Cycle </h1><ul>";

    const sqlSelect = "SELECT * FROM people";
    connection.query(sqlSelect, function (err, result) {
        if (err) throw err;
        result.forEach((item) => {
            html += `<li>${item.name}</li>`;
        });
        html += `</ul>`;
        res.send(html);
    });
});

app.listen(port, bindAddress, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log("Rodando na porta " + port);
  }
});
