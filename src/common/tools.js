/**
 * 放一些常用的工具函数
 */
import Taro from "@tarojs/taro";
import { objectToString } from "./utils";

const tools = {
  /**
   * 网络请求
   * @param {*} opts
   * @returns
   */
  request: (opts) => {
    const {
      url = "",
      params = {}, // 请求参数
      method = "GET",
      ...rest // 剩余参数
    } = opts;
    return new Promise((resolve, reject) => {
      Taro.request({
        url,
        data: params,
        method,
        ...rest,
      })
        .then((res) => {
          const { data } = res;
          if (data?.code === 1) {
            // 成功
            resolve(data);
          } else {
            // 不是预期的结果
            reject(data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  /**
   * 页面 loading
   * @param {*} param
   * @returns
   */
  showLoading: (param = "") => {
    let dptOpts = {
      title: "加载中......",
      mask: true, // 防止触摸穿透
    };
    if (Object.prototype.toString.call(param) === "[object String]") {
      dptOpts.title = param;
    } else if (Object.prototype.toString.call(param) === "[object Object]") {
      dptOpts = {
        ...dptOpts,
        ...param,
      };
    }
    return Taro.showLoading(dptOpts);
  },

  hideLoading: () => {
    Taro.hideLoading();
  },

  /**
   * 页面对话框
   * @param {*} param
   * @returns
   */
  showToast: (param) => {
    let dptOpts = {
      title: "温馨提示",
      icon: "none",
      mask: true,
      duration: 2000, // 提示时间
    };
    if (Object.prototype.toString.call(param) === "[object String]") {
      dptOpts.title = param;
    } else if (Object.prototype.toString.call(param) === "[object Object]") {
      dptOpts = {
        ...dptOpts,
        ...param,
      };
    } else {
      throw new Error("参数类型有误，应该是字符串或者对象");
    }
    return Taro.showToast(dptOpts);
  },
  // url: 跳转的路径，data: 传递的页面参数
  navigateTo: ({ url, data }) => {
    const serachStr = objectToString(data);
    return Taro.navigateTo({
      url: `${url}?${serachStr}`,
    });
  },
};

export default tools;
