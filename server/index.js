const express = require("express");
const app = express();
const port = 3000;

const mysql = require(`mysql`);

// database & table value => (users, userA)

const con = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: ``,
  database: `users`,
});

con.connect(function (err) {
  //에러일 경우
  if (err) throw err;
  
  console.log(`Connected`);

  //콘솔창에서 데이터 확인
  // const sql = "select * from userA"
  // con.query(sql, function (err, result, fields) {

  //   if (err) {throw err;}
  //   console.log(result)
  // });


  //db에 더미데이터 추가
  const sql = 

  `insert into userA(walletAddressUserA,tokenInfo) values('은연수', json_object(
    'age', 29,
    'gender', 'woman',
    '부서', '개발',
    '자격증', json_array('CISA', 'PMP', 'CISSP')
    ))`;

  con.query(sql,function(err, result, fields){
    if (err) throw err;
    console.log(result)
    
  })
});



app.get("/", (req, res) => {
  const sql = "select * from userA";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
