import { create } from "dva-core";

let app; // dva 实例
let store; // 位置项目所有的 state 树的对象
let dispatch; // 改变 state 中 state 的唯一方法

const createApp = (opts) => {
  app = create(opts); // 创建了 dva 实例
  if (!global.registered) {
    // 确保所有 state 模块 （model）只注册一次
    opts.models.forEach((model) => app.model(model));
  }
  global.registered = true;
  // 运行程序
  app.start();
  store = app._store;
  // 用函数返回 store，确保每次拿到的都是一个全新的对象
  app.getStore = () => store;
  dispatch = store.dispatch;
  app.dispatch = dispatch;

  return app;
};

export default createApp;
