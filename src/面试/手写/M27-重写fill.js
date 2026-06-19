/**
 * 重写 fill
 *
 * Array.prototype.fill(value, start, end) 的规则：
 * 1. 用 value 填充 [start, end) 区间。
 * 2. 会修改原数组，并返回修改后的对象。
 * 3. start 和 end 可以是负数，负数表示 length + index。
 * 4. 不要求 this 一定是数组，也可以作用在类数组对象上。
 */

/**
 * 第一版 fill1
 *
 * 暴力版。
 * 只处理普通数组，并默认填充整个数组。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {any[]} arr
 * @param {any} value
 * @return {any[]}
 */
function fill1(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = value;
  }

  return arr;
}

/**
 * 第二版 fill2
 *
 * 支持 start 和 end。
 * 可以处理负数区间，但只面向普通数组使用。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {any[]} arr
 * @param {any} value
 * @param {number} start
 * @param {number} end
 * @return {any[]}
 */
function fill2(arr, value, start = 0, end = arr.length) {
  const len = arr.length;
  let from = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
  const to = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);

  while (from < to) {
    arr[from] = value;
    from++;
  }

  return arr;
}

/**
 * 第三版 myFill（面试推荐版）
 *
 * 按原生 fill 的关键行为实现。
 *
 * 这版现场更推荐：
 * 1. this 为 null 或 undefined 时抛 TypeError。
 * 2. 用 Object(this) 支持类数组对象。
 * 3. 用 length >>> 0 得到合法长度。
 * 4. start/end 按相对索引归一化到 [0, length]。
 * 5. 修改原对象并返回它。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {any} value
 * @param {number} start
 * @param {number} end
 * @return {object}
 */
function myFill(value, start = 0, end) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }

  const obj = Object(this);
  const len = obj.length >>> 0;
  const relativeStart = Number(start) || 0;
  const relativeEnd = end === undefined ? len : Number(end) || 0;

  let index = relativeStart < 0
    ? Math.max(len + relativeStart, 0)
    : Math.min(relativeStart, len);
  const final = relativeEnd < 0
    ? Math.max(len + relativeEnd, 0)
    : Math.min(relativeEnd, len);

  while (index < final) {
    obj[index] = value;
    index++;
  }

  return obj;
}

/**
 * 安装到 Array.prototype，面试演示时可按需调用。
 * 默认不自动覆盖原生 fill，避免影响其他题解文件。
 */
function installMyFill() {
  Object.defineProperty(Array.prototype, "myFill", {
    value: myFill,
    configurable: true,
    writable: true,
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    fill1,
    fill2,
    myFill,
    installMyFill,
  };
}
