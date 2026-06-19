/**
 * 手写 Proxy 代理对象 - 实现数组负索引
 *
 * 目标：
 * 让 arr[-1] 表示最后一个元素，arr[-2] 表示倒数第二个元素。
 */

/**
 * 第一版 proxyArray1
 *
 * 暴力转换版。
 * 每次访问属性时，如果是负数字符串，就转换成 length + index。
 *
 * 这版能处理 -1、-2 这类常见负索引，但 -10 超出数组长度时会返回 undefined。
 *
 * 访问复杂度 O(1)，空间复杂度 O(1)。
 * @param {any[]} arr
 * @return {any[]}
 */
function proxyArray1(arr) {
  return new Proxy(arr, {
    get(target, key, receiver) {
      const index = Number(key);

      if (Number.isInteger(index) && index < 0) {
        return target[target.length + index];
      }

      return Reflect.get(target, key, receiver);
    },
  });
}

/**
 * 第二版 proxyArray2
 *
 * 支持负索引循环取值。
 * 例如长度为 9 时，-10 会落到倒数第 1 个元素。
 *
 * 这版比第一版多处理了超出一轮长度的负索引，但没有处理空数组。
 *
 * 访问复杂度 O(1)，空间复杂度 O(1)。
 * @param {any[]} arr
 * @return {any[]}
 */
function proxyArray2(arr) {
  return new Proxy(arr, {
    get(target, key, receiver) {
      const index = Number(key);

      if (Number.isInteger(index) && index < 0) {
        const normalizedIndex = ((index % target.length) + target.length) % target.length;
        return target[normalizedIndex];
      }

      return Reflect.get(target, key, receiver);
    },
  });
}

/**
 * 第三版 proxyArray（面试推荐版）
 *
 * Proxy + Reflect。
 *
 * 这版现场更推荐：
 * 1. 只对整数下标做负索引转换，length、push、Symbol.iterator 等属性走原生 Reflect.get。
 * 2. 支持负索引循环取值。
 * 3. 空数组直接返回 undefined，避免取模时出现 NaN。
 *
 * 访问复杂度 O(1)，空间复杂度 O(1)。
 * @param {any[]} arr
 * @return {any[]}
 */
function proxyArray(arr) {
  return new Proxy(arr, {
    get(target, key, receiver) {
      const index = Number(key);

      if (Number.isInteger(index) && index < 0) {
        if (target.length === 0) return undefined;
        const normalizedIndex = ((index % target.length) + target.length) % target.length;
        return target[normalizedIndex];
      }

      return Reflect.get(target, key, receiver);
    },
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    proxyArray1,
    proxyArray2,
    proxyArray,
  };
}
