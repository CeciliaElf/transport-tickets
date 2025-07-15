/**
 * 将对象解析成 url 参数
 * @param {*} obj 
 * @returns 
 */
export const objectToString = (obj) => {
  let searchKey = [];
  if (
    Object.prototype.toString.call(obj) === "[object Object]" &&
    Object.keys(obj).length
  ) {
    for (let key in obj) {
      searchKey.push(`${key} = ${obj[key]}`);
    }
  }
  return searchKey.join("&");
};
