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

  //DB에 저장
  // con

  //DB에서 스키마 가져오기
  // const sql = "select * from userA"
  // con.query(sql, funtion (err, result, fields) {

  //   if (err) {throw err;}
  //   console.log(result)
  // });
});


app.get('/', (req, res) => res.send ('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
