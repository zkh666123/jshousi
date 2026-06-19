/**
 * 模拟 Promise.allSettled
 *
 * Promise.allSettled(iterable) 的规则：
 * 1. 等待所有输入都 settled。
 * 2. 不会因为某一项 rejected 就提前失败。
 * 3. 结果数组顺序和输入顺序一致。
 * 4. 每项结果是 { status: "fulfilled", value } 或 { status: "rejected", reason }。
 */

/**
 * 第一版 myPromiseAllSettled1
 *
 * 基础数组版。
 * 每个输入都用 Promise.resolve 包装，成功和失败都写入 result。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {Array<Promise<any> | any>} promiseArr
 * @return {Promise<Array<object>>}
 */
function myPromiseAllSettled1(promiseArr) {
  return new Promise((resolve) => {
    const len = promiseArr.length;
    const result = new Array(len);
    let settledCount = 0;

    if (len === 0) {
      resolve([]);
      return;
    }

    for (let i = 0; i < len; i++) {
      Promise.resolve(promiseArr[i]).then(
        (value) => {
          result[i] = { status: "fulfilled", value };
          settledCount++;
          if (settledCount === len) resolve(result);
        },
        (reason) => {
          result[i] = { status: "rejected", reason };
          settledCount++;
          if (settledCount === len) resolve(result);
        }
      );
    }
  });
}

/**
 * 第二版 myPromiseAllSettled2
 *
 * 使用 Promise.all 转换每一项。
 * 把每个 Promise 的成功/失败都转换成 fulfilled 的结果对象，
 * 这样外层 Promise.all 就永远不会因为单项失败而提前 reject。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {Iterable<Promise<any> | any>} iterable
 * @return {Promise<Array<object>>}
 */
function myPromiseAllSettled2(iterable) {
  return Promise.all(
    Array.from(iterable, (promise) =>
      Promise.resolve(promise).then(
        (value) => ({ status: "fulfilled", value }),
        (reason) => ({ status: "rejected", reason })
      )
    )
  );
}

/**
 * 第三版 myPromiseAllSettled（面试推荐版）
 *
 * 支持 iterable + 手写计数器。
 *
 * 这版现场更推荐：
 * 1. 不覆盖原生 Promise.allSettled。
 * 2. 普通值、Promise、thenable 都用 Promise.resolve 统一处理。
 * 3. 成功和失败都只增加 settledCount，不提前 reject。
 * 4. 结果顺序和输入顺序一致。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {Iterable<Promise<any> | any>} iterable
 * @return {Promise<Array<object>>}
 */
function myPromiseAllSettled(iterable) {
  return new Promise((resolve) => {
    const promiseArr = Array.from(iterable);
    const len = promiseArr.length;
    const result = new Array(len);
    let settledCount = 0;

    if (len === 0) {
      resolve([]);
      return;
    }

    promiseArr.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          result[index] = { status: "fulfilled", value };
          settledCount++;
          if (settledCount === len) resolve(result);
        },
        (reason) => {
          result[index] = { status: "rejected", reason };
          settledCount++;
          if (settledCount === len) resolve(result);
        }
      );
    });
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    myPromiseAllSettled1,
    myPromiseAllSettled2,
    myPromiseAllSettled,
  };
}
