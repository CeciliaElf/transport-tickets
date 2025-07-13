const mysql = require("mysql2");

const options = {
  host: "localhost", // 主机名
  port: 3306,
  user: "root",
  password: "080331lqs",
  database: "db_transport_tickets",
};

// 创建数据库链接操作
const connection = mysql.createConnection(options);

// 建立链接
connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("数据库连接成功");
  }
});

// mysql 查询命令
// connection.query('SELECT * FROM tickets', (err, res, fields) => {
//     console.log(res)
// })

/**
 * 公共查询命令封装方法
 * @param {*} strSql
 * @returns
 */
const sqlQuery = (strSql) => {
  return new Promise((resolve, reject) => {
    connection.query(strSql, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

module.exports = sqlQuery;
