/**
 * 模拟 Promise.all
 *
 * Promise.all(iterable) 的规则：
 * 1. 所有输入都 fulfilled 时，按输入顺序 resolve 结果数组。
 * 2. 任意一个输入 rejected 时，立即 reject 第一个失败原因。
 * 3. 普通值也会被当成已经 fulfilled 的 Promise。
 * 4. 空 iterable 会 resolve []。
 */

/**
 * 第一版 myPromiseAll1
 *
 * 基础数组版。
 * 用计数器记录已经成功的数量，全部成功后 resolve。
 *
 * 这版只处理数组，但核心逻辑清楚。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {Array<Promise<any> | any>} promiseArr
 * @return {Promise<any[]>}
 */
function myPromiseAll1(promiseArr) {
  return new Promise((resolve, reject) => {
    const len = promiseArr.length;
    const result = new Array(len);
    let fulfilledCount = 0;

    if (len === 0) {
      resolve([]);
      return;
    }

    for (let i = 0; i < len; i++) {
      Promise.resolve(promiseArr[i]).then(
        (value) => {
          result[i] = value;
          fulfilledCount++;

          if (fulfilledCount === len) {
            resolve(result);
          }
        },
        reject
      );
    }
  });
}

/**
 * 第二版 myPromiseAll2
 *
 * 支持任意 iterable。
 * 用 Array.from 转成数组，保证 Set、Map values 等可迭代对象也能处理。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {Iterable<Promise<any> | any>} iterable
 * @return {Promise<any[]>}
 */
function myPromiseAll2(iterable) {
  return myPromiseAll1(Array.from(iterable));
}

/**
 * 第三版 myPromiseAll（面试推荐版）
 *
 * 支持 iterable，并保证输出顺序和输入顺序一致。
 *
 * 这版现场更推荐：
 * 1. Promise.resolve 统一处理普通值、Promise 和 thenable。
 * 2. result[index] 按输入下标写入，避免按完成顺序打乱结果。
 * 3. 任意失败直接 reject。
 * 4. 空 iterable 直接 resolve []。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {Iterable<Promise<any> | any>} iterable
 * @return {Promise<any[]>}
 */
function myPromiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const promiseArr = Array.from(iterable);
    const len = promiseArr.length;
    const result = new Array(len);
    let fulfilledCount = 0;

    if (len === 0) {
      resolve([]);
      return;
    }

    promiseArr.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          result[index] = value;
          fulfilledCount++;

          if (fulfilledCount === len) {
            resolve(result);
          }
        },
        reject
      );
    });
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    myPromiseAll1,
    myPromiseAll2,
    myPromiseAll,
  };
}
