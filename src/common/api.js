/**
 * api 统一管理
 */
import tools from "@/common/tools";

const API_PRE = "http://localhost:3000";

// 营销广告接口请求
// data 请求接口要传的参数
export const adsReq = (data) =>
  tools.request({
    url: `${API_PRE}/ads/advertising`,
    params: data,
  });

// 城市列表
export const airportCityListReq = (data) =>
  tools.request({
    url: `${API_PRE}/city/airportList`,
    params: data,
  });
