const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");
const fs = require("fs");
const path = require("path");

// // 从JSON文件读取机场数据
// async function loadAirportData() {
//   try {
//     const dataPath = path.join(__dirname, '../data/airports.json');
//     const rawData = fs.readFileSync(dataPath);
//     return JSON.parse(rawData);
//   } catch (err) {
//     console.error("Error loading airport data:", err);
//     // 如果文件读取失败，返回一个空数据结构
//     return { code: 1, mes: "数据加载失败", result: [] };
//   }
// }

// // 创建机场城市列表
// (async function() {
//   try {
//     // 创建表（如果不存在）
//     const createTableSql = `
//     CREATE TABLE IF NOT EXISTS airport_list(
//       id INT NOT NULL AUTO_INCREMENT,
//       cityName CHAR(50) NOT NULL,
//       cityId INT NOT NULL,
//       firstLetter CHAR(50) NOT NULL,
//       airportName CHAR(50) NOT NULL,
//       PRIMARY KEY (id)
//     ) ENGINE = InnoDB`;

//     await sqlQuery(createTableSql);

//     // 清空表，避免重复数据
//     await sqlQuery("TRUNCATE TABLE airport_list");

//     // 加载数据
//     const airportData = await loadAirportData();

//     if (airportData.result.length > 0) {
//       // 批量插入 - 为大数据集提高性能
//       const values = airportData.result.map(airport => {
//         const { id, cityName, cityId, firstLetter, airportName } = airport;
//         // 处理字符串中的单引号，防止SQL注入
//         const safeCityName = cityName.replace(/'/g, "''");
//         const safeFirstLetter = firstLetter.replace(/'/g, "''");
//         const safeAirportName = airportName.replace(/'/g, "''");

//         return `(${id}, '${safeCityName}', ${cityId}, '${safeFirstLetter}', '${safeAirportName}')`;
//       }).join(', ');

//       // 一次性插入所有数据
//       const batchInsertSql = `INSERT INTO airport_list
//         (id, cityName, cityId, firstLetter, airportName) VALUES ${values}`;

//       await sqlQuery(batchInsertSql);
//       console.log(`机场数据导入成功: ${airportData.result.length} 条记录`);
//     } else {
//       console.log("没有机场数据可导入");
//     }
//   } catch (err) {
//     console.error("Error creating airport list:", err);
//   }
// })();

router.get("/airportList", async (req, res) => {
  const strSql = `SELECT * FROM airport_list`;
  try {
    const result = await sqlQuery(strSql);
    // 按照首字母排序
    if (Array.isArray(result) && result.length) {
      // sort方法是按照字符串 ASCII 码值进行排序
      result.sort((x, y) => {
        if (x.firstLetter < y.firstLetter) {
          return -1;
        } else if (x.firstLetter > y.firstLetter) {
          return 1;
        }
        return 0;
      });
    }
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
