const express = require('express')
const app =express()
const port = 3000

const mysql = require(`mysql`);

const con = mysql.createConnection({
    host: `localhost`,
    user: `root`,
    password: ``,
    database: `users`
});

// userB 테이블 작성
// create table userB (
// 	walletAddressUserB varchar(200) not null,
// 	tokenInfo json,
// 	primary key (`walletAddressUserB`)
// );

con.connect(function(err){
  //에러일 경우
  if (err) {throw err;}
  console.log(`Connected`);
    //콘솔창에서 데이터 확인
  // const sql = "select * from userA"
  // con.query(sql, function (err, result, fields) {

  //   if (err) {throw err;}
  //   console.log(result)
  // });
});


app.get('/', (req, res) => {
const sql = "select * from userA"
con.query(sql, function (err, result, fields){
if (err) {throw err;}
res.send (result)})

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
