const express = require("express");
const app = express();
const port = 4999;
const path = require('path')
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require(`mysql`);

// Mysql 정보

const con = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: ``,
  database: `users`,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// con.connect(function (err) {
//   if (err) throw err;
//   console.log(`Connected`);
//   const sql = 
//   `insert into userA(walletAddressUserA,tokenInfo) values('은연수', json_object(
//     'age', 29,
//     'gender', 'woman',
//     '부서', '개발',
//     '자격증', json_array('CISA', 'PMP', 'CISSP')
//     ))`;
//   con.query(sql,function(err, result, fields){
//     if (err) throw err;
//     console.log(result)
//   })
// });

app.get("/", (req, res) => {
  res.send('Hello World!')  
 
});

// app.get("/", (req, res) => {
//   const sql = "select * from userA";
//   con.query(sql, function (err, result, fields) {
//     if (err) throw err;
//     res.send(result);
//   });
// });

app.post("/user", (req, res) => {//데이터 받는 곳
  const user_id = req.body.inText;
  console.log(user_id);
  connection.query("INSERT INTO new_table (user_id) values(?)", [user_id]),
    function (err, rows, fields) {
      if (err) {
        console.log("DB저장 실패");
      }else{
	console.log("DB저장 성공");
    }};
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
