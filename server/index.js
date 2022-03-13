const express = require('express')
const app = express()
const port = 3001

const mysql = require('mysql');

// const con = mysql.createConnection({
//     host : 'localhost',
//     user: 'root',
//     password: '1234',
//     database: 'users'
// });

con.connect(function(err){
    if(err) throw err;
    console.log('Connected');
    // 데이터베이서 생성
    // con.query('CREATE DATABASE users', function(err, result){
    //     console.log('database created');
    // });
    // const sql = 'CREATE TABLE users
    //             (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    //              name VARCHAR(255) NOT NULL,
    //              email VARCHAR(255) NOT NULL))';

    // con.query(sql. function  (err, result) {
        
    // });
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})