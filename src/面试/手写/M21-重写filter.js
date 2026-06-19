/**
 * 重写 filter
 *
 * Array.prototype.filter(callback, thisArg) 的规则：
 * 1. 返回一个新数组，不改变原数组。
 * 2. callback 返回 truthy 的元素会进入结果数组。
 * 3. callback 参数是 currentValue、index、array。
 * 4. 稀疏数组空位会被跳过。
 */

/**
 * 第一版 filter1
 *
 * 暴力循环版。
 * 只处理普通数组，不处理 thisArg、稀疏数组和参数校验。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {any[]} arr
 * @param {Function} callback
 * @return {any[]}
 */
function filter1(arr, callback) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }

  return result;
}

/**
 * 第二版 filter2
 *
 * 支持 thisArg，并跳过稀疏数组空位。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {any[]} arr
 * @param {Function} callback
 * @param {any} thisArg
 * @return {any[]}
 */
function filter2(arr, callback, thisArg) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (i in arr && callback.call(thisArg, arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }

  return result;
}

/**
 * 第三版 myFilter（面试推荐版）
 *
 * 按原生 filter 的关键行为实现。
 *
 * 这版现场更推荐：
 * 1. this 为 null 或 undefined 时抛 TypeError。
 * 2. callback 不是函数时抛 TypeError。
 * 3. 用 Object(this) 支持类数组对象。
 * 4. 用 length >>> 0 得到合法长度。
 * 5. 用 index in obj 跳过稀疏数组空位。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {Function} callback
 * @param {any} thisArg
 * @return {any[]}
 */
function myFilter(callback, thisArg) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const obj = Object(this);
  const len = obj.length >>> 0;
  const result = [];

  for (let index = 0; index < len; index++) {
    if (index in obj && callback.call(thisArg, obj[index], index, obj)) {
      result.push(obj[index]);
    }
  }

  return result;
}

function installMyFilter() {
  Object.defineProperty(Array.prototype, "myFilter", {
    value: myFilter,
    configurable: true,
    writable: true,
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    filter1,
    filter2,
    myFilter,
    installMyFilter,
  };
}
