/**
 * 重写 forEach
 *
 * Array.prototype.forEach(callback, thisArg) 的规则：
 * 1. 对数组中每个已存在的元素执行一次 callback。
 * 2. callback 参数是 currentValue、index、array。
 * 3. 可传 thisArg 指定 callback 内部 this。
 * 4. 返回值永远是 undefined。
 * 5. 稀疏数组中的空位会被跳过。
 */

/**
 * 第一版 forEach1
 *
 * 暴力循环版。
 * 只处理普通数组，不处理 this 为空、callback 不是函数、稀疏数组等边界。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {any[]} arr
 * @param {Function} callback
 * @return {undefined}
 */
function forEach1(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
}

/**
 * 第二版 forEach2
 *
 * 增加 thisArg，并跳过稀疏数组空位。
 *
 * 这版已经接近原生行为，但还没有处理类数组对象和参数校验。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {any[]} arr
 * @param {Function} callback
 * @param {any} thisArg
 * @return {undefined}
 */
function forEach2(arr, callback, thisArg) {
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      callback.call(thisArg, arr[i], i, arr);
    }
  }
}

/**
 * 第三版 myForEach（面试推荐版）
 *
 * 按原生 forEach 的关键行为实现。
 *
 * 这版现场更推荐：
 * 1. this 为 null 或 undefined 时抛 TypeError。
 * 2. callback 不是函数时抛 TypeError。
 * 3. 用 Object(this) 支持类数组对象。
 * 4. 用 length >>> 0 转成无符号 32 位长度。
 * 5. 用 index in obj 跳过稀疏数组空位。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {Function} callback
 * @param {any} thisArg
 * @return {undefined}
 */
function myForEach(callback, thisArg) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const obj = Object(this);
  const len = obj.length >>> 0;

  for (let index = 0; index < len; index++) {
    if (index in obj) {
      callback.call(thisArg, obj[index], index, obj);
    }
  }
}

/**
 * 安装到 Array.prototype，面试演示时可按需调用。
 * 默认不自动覆盖原生 forEach，避免影响其他题解文件。
 */
function installMyForEach() {
  Object.defineProperty(Array.prototype, "myForEach", {
    value: myForEach,
    configurable: true,
    writable: true,
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    forEach1,
    forEach2,
    myForEach,
    installMyForEach,
  };
}
