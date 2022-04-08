const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors());

const db = new sqlite3.Database("./tanulok.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);

  console.log("Csatlakozás sikeres!");
});

app.get("/attekintes", function (request, response) {
  console.log("Áttekintés:");
  const sql = 'SELECT * FROM tanulok';
  var rows;
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row => {
      //console.log(rows);
    }))
    response.send(rows);
  });

});

app.post('/feltoltes/:param', function (request, response) {
  console.log("Feltöltés:");
  var data = request.params.param.split(';');
  const sql = "INSERT into tanulok (veznev, kernev, email, osztaly) values ('" + data[0] + "', '" + data[1] + "', '" + data[2] + "', '" + data[3] + "')";
  console.log(sql);
  db.run(sql);
  console.log("Új tanuló rögzítve!");
});

app.post('/frissites/:param', function (request, response) {
  console.log("Frissítés:");
  var data = request.params.param.split(';');
  const sql = "UPDATE tanulok SET veznev='" + data[1] + "', kernev='" + data[2] + "', email='" + data[3] + "', osztaly='" + data[4] + "' WHERE id='" + data[0] + "'";
  console.log(sql);
  db.run(sql);
  console.log("Adatok frissítve, id: " + data[0]);

});

app.post('/torles/:param', function (request, response) {
  console.log("Törlés:");
  var data =request.params.param;
  const sql = "delete from tanulok where id = "+data+"";
  console.log(sql);
  db.run(sql);
  console.log("Tanuló törölve, id: " + data);
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("A szerver sikeresen elindult! PORT: "+port);
});