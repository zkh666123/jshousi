/**
 * 模拟 Promise.race
 *
 * Promise.race(iterable) 的规则：
 * 1. 返回一个新的 Promise。
 * 2. 输入中第一个 settled 的项决定返回 Promise 的状态和值。
 * 3. fulfilled 就 resolve，rejected 就 reject。
 * 4. 空 iterable 会让返回的 Promise 一直 pending。
 */

/**
 * 第一版 myPromiseRace1
 *
 * 基础数组版。
 * 遍历数组，把每一项用 Promise.resolve 包装，然后把 then 的结果接到外层 Promise。
 *
 * 这版能覆盖核心行为，但只接收数组。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {Array<Promise<any> | any>} promiseArr
 * @return {Promise<any>}
 */
function myPromiseRace1(promiseArr) {
  return new Promise((resolve, reject) => {
    for (const promise of promiseArr) {
      Promise.resolve(promise).then(resolve, reject);
    }
  });
}

/**
 * 第二版 myPromiseRace2
 *
 * 支持任意 iterable。
 * 和原生 Promise.race 一样，可以传数组、Set 等可迭代对象。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {Iterable<Promise<any> | any>} iterable
 * @return {Promise<any>}
 */
function myPromiseRace2(iterable) {
  return new Promise((resolve, reject) => {
    for (const promise of iterable) {
      Promise.resolve(promise).then(resolve, reject);
    }
  });
}

/**
 * 第三版 myPromiseRace（面试推荐版）
 *
 * Promise.resolve + then 透传。
 *
 * 这版现场推荐重点讲清楚：
 * 1. 普通值也要参与 race，所以要用 Promise.resolve 包装。
 * 2. 最先 fulfilled 或 rejected 的项都能结束外层 Promise。
 * 3. 空 iterable 不调用 resolve/reject，因此保持 pending。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {Iterable<Promise<any> | any>} iterable
 * @return {Promise<any>}
 */
function myPromiseRace(iterable) {
  return new Promise((resolve, reject) => {
    for (const promise of iterable) {
      Promise.resolve(promise).then(resolve, reject);
    }
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    myPromiseRace1,
    myPromiseRace2,
    myPromiseRace,
  };
}
