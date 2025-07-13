const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");

// const imgLists = [
//   "http://localhost:3000/static/banner01.png",
//   "http://localhost:3000/static/banner02.png",
// ];
// const createTable = async () => {
//   try {
//     // 创建表
//     const createTableSql = `
//       CREATE TABLE IF NOT EXISTS ads (
//           id INT AUTO_INCREMENT,
//           imgUrl CHAR(255) NOT NULL UNIQUE, -- 添加 UNIQUE 约束
//           PRIMARY KEY (id)
//       ) ENGINE=InnoDB;
//     `;
//     await sqlQuery(createTableSql);
//     for (let i = 0; i < imgLists.length; i++) {
//       const insertSql = `INSERT IGNORE INTO ads(id, imgUrl) VALUES (null, '${imgLists[i]}')`;
//       await sqlQuery(insertSql);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// createTable();

router.get("/advertising", async (req, res) => {
  const strSql = "SELECT * FROM ads";
  try {
    const result = await sqlQuery(strSql);
    res.send({
      code: 1,
      message: "请求成功",
      result,
    });
  } catch (error) {
    res.send({
      code: -1,
      message: "请求失败",
    });
  }
});

module.exports = router;
