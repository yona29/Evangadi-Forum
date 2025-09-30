import mysql from "mysql2";

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "evangadi-admin",
  password: "123456",
  database: "evangadi_forum",
});

dbConnection.execute("select 'test'", (err,res)=>{
    if(err) console.log(err.message);
    console.log(res);
})