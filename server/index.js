const express = require("express");
const path = require('path'); 
const models = require("./models");

const app = express();

// 將 get 路由指定到自定义的路径
// app.get("/", (req, res) => {
//   // req: 请求对象
//   // res: 相应对象
//   res.send("hello world");
// });
app.use('/static', express.static(path.join(__dirname, 'pic'))); 

models(app)
const port = 3000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
