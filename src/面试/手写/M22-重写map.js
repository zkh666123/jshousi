/**
 * 重写 map
 *
 * Array.prototype.map(callback, thisArg) 的规则：
 * 1. 返回一个新数组，不改变原数组。
 * 2. 新数组每一项来自 callback 的返回值。
 * 3. callback 参数是 currentValue、index、array。
 * 4. 稀疏数组空位会被跳过，并在结果数组中保留空位。
 */

/**
 * 第一版 map1
 *
 * 暴力循环版。
 * 只处理普通数组，不处理 thisArg、稀疏数组和参数校验。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {any[]} arr
 * @param {Function} callback
 * @return {any[]}
 */
function map1(arr, callback) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    result[i] = callback(arr[i], i, arr);
  }

  return result;
}

/**
 * 第二版 map2
 *
 * 支持 thisArg，并跳过稀疏数组空位。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {any[]} arr
 * @param {Function} callback
 * @param {any} thisArg
 * @return {any[]}
 */
function map2(arr, callback, thisArg) {
  const result = new Array(arr.length);

  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      result[i] = callback.call(thisArg, arr[i], i, arr);
    }
  }

  return result;
}

/**
 * 第三版 myMap（面试推荐版）
 *
 * 按原生 map 的关键行为实现。
 *
 * 这版现场更推荐：
 * 1. this 为 null 或 undefined 时抛 TypeError。
 * 2. callback 不是函数时抛 TypeError。
 * 3. 用 Object(this) 支持类数组对象和字符串。
 * 4. 用 length >>> 0 得到合法长度。
 * 5. 结果数组长度和原长度一致，稀疏空位保持为空位。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {Function} callback
 * @param {any} thisArg
 * @return {any[]}
 */
function myMap(callback, thisArg) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const obj = Object(this);
  const len = obj.length >>> 0;
  const result = new Array(len);

  for (let index = 0; index < len; index++) {
    if (index in obj) {
      result[index] = callback.call(thisArg, obj[index], index, obj);
    }
  }

  return result;
}

function installMyMap() {
  Object.defineProperty(Array.prototype, "myMap", {
    value: myMap,
    configurable: true,
    writable: true,
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    map1,
    map2,
    myMap,
    installMyMap,
  };
}
