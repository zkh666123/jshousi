/**
 * 重写 every
 *
 * Array.prototype.every(callback, thisArg) 的规则：
 * 1. 只要有一个元素不满足 callback，就返回 false。
 * 2. 所有已存在元素都满足 callback，返回 true。
 * 3. 空数组返回 true。
 * 4. 稀疏数组空位会被跳过。
 */

/**
 * 第一版 every1
 *
 * 暴力循环版。
 * 只处理普通数组，不处理 thisArg、稀疏数组和参数校验。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {any[]} arr
 * @param {Function} callback
 * @return {boolean}
 */
function every1(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    if (!callback(arr[i], i, arr)) {
      return false;
    }
  }

  return true;
}

/**
 * 第二版 every2
 *
 * 支持 thisArg，并跳过稀疏数组空位。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {any[]} arr
 * @param {Function} callback
 * @param {any} thisArg
 * @return {boolean}
 */
function every2(arr, callback, thisArg) {
  for (let i = 0; i < arr.length; i++) {
    if (i in arr && !callback.call(thisArg, arr[i], i, arr)) {
      return false;
    }
  }

  return true;
}

/**
 * 第三版 myEvery（面试推荐版）
 *
 * 按原生 every 的关键行为实现。
 *
 * 这版现场更推荐：
 * 1. this 为 null 或 undefined 时抛 TypeError。
 * 2. callback 不是函数时抛 TypeError。
 * 3. 支持类数组对象。
 * 4. 稀疏数组空位跳过。
 * 5. 空数组自然返回 true。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {Function} callback
 * @param {any} thisArg
 * @return {boolean}
 */
function myEvery(callback, thisArg) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const obj = Object(this);
  const len = obj.length >>> 0;

  for (let index = 0; index < len; index++) {
    if (index in obj && !callback.call(thisArg, obj[index], index, obj)) {
      return false;
    }
  }

  return true;
}

function installMyEvery() {
  Object.defineProperty(Array.prototype, "myEvery", {
    value: myEvery,
    configurable: true,
    writable: true,
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    every1,
    every2,
    myEvery,
    installMyEvery,
  };
}
