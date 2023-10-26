const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors({
  origin: '*'
}))

// json(javascript object notation - 값 쌍, 배열 자료형으로 구조화 된 데이터)
app.use(express.json());


const mysql = require("mysql2"); // mysql 드라이버
// db 설정 정보
const dbconfig = {
    host : 'localhost',
    port : '3306', // default 3306
    user : 'smartdev',
    password : 'smartdev',
    database : 'smartdev',
    connectionLimit : 50 // default 10
};

// db 커넥션 생성
const pool = mysql.createPool(dbconfig);

// get 모든 학년 조회
app.get("/api/grade", async (req, res) => {
  let sql = `SELECT * 
               FROM grade
            `;
  connection_db(sql, [], res);
});

// get 모든 과목 조회
app.get("/api/subject", async (req, res) => {
  let grade_seq = req.query.grade_seq;
  let sql = `
    SELECT * 
      FROM subject 
     WHERE grade_seq = ?
  `;
  connection_db(sql, [grade_seq], res);
});

// get 모든 문제 조회
app.get("/api/beginner", async (req, res) => {
  const { subject, grade } = req.query;
  if (!subject || !grade) {
    res.status(400).send('Missing parameters');
    return;
  }
  let sql = `
    SELECT p.* 
      FROM problem p
      JOIN subject s ON p.subject_seq = s.subject_seq
      JOIN grade g ON s.grade_seq = g.grade_seq
     WHERE s.name = ? AND g.grade_seq = ?
  `;
  connection_db(sql, [subject, grade], res);
});


// db 연결 함수
function connection_db(sql, params, res) {
    // 커넥션 풀 가져오기
    pool.getConnection((err, conn) => {
        if (err) {
            console.error('MySQL connection error:', err);
            // 내부 서버 오류
            res.status(500).send('Internal Server Error');
            return;
        }
        // 쿼리 수행
        conn.query(sql, params, (qry, results) => {
            // 커넥션 반환
            conn.release();
            if (qry) {
                console.error('MySQL query error:', qry);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(results);
        });
    });
}




// 서버 실행
const server = app.listen(3003, () => {
    console.log('Start server : localhost:3003');
});
