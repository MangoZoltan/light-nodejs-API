const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');

fs.open('tanulok.db', 'w', function (err, file) {
  if (err) throw err;
  console.log('Mentve!');
});
fs.close;

const db = new sqlite3.Database("./tanulok.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
  
    console.log("Csatlakozás sikeres!");
  });
  
db.run('CREATE TABLE tanulok (id INTEGER PRIMARY KEY AUTOINCREMENT, veznev TEXT NOT NULL, kernev TEXT NOT NULL, email TEXT UNIQUE NOT NULL, osztaly TEXT NOT NULL)', (err)=>{
  if(err) return console.error(err.message);

  console.log("Created!");
});


const sql ='INSERT INTO tanulok (veznev, kernev, email, osztaly) VALUES(?,?,?,?)';
db.run(sql, ["mike", "alma", "asd@gmail.com", "aaaaaa aaaa"], (err)=>{
    if(err) return console.error(err.message);

    console.log("A new row added!");
});

