/**
 * 模拟 Promise.any
 *
 * Promise.any(iterable) 的规则：
 * 1. 只要有一个 promise fulfilled，就用这个成功值 resolve。
 * 2. 如果全部 rejected，则 reject 一个 AggregateError。
 * 3. 空 iterable 会直接 reject AggregateError。
 */

/**
 * 第一版 myPromiseAny1
 *
 * 基础版。
 * 遍历数组，任意一个成功就 resolve；失败时计数，全部失败后 reject。
 *
 * 这版适合理解核心行为，但只接收数组。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)，用于保存失败原因。
 * @param {Array<Promise<any> | any>} promiseArr
 * @return {Promise<any>}
 */
function myPromiseAny1(promiseArr) {
  return new Promise((resolve, reject) => {
    const len = promiseArr.length;
    const errors = [];
    let rejectedCount = 0;

    if (len === 0) {
      reject(new AggregateError([], "All promises were rejected"));
      return;
    }

    for (let i = 0; i < len; i++) {
      Promise.resolve(promiseArr[i]).then(
        resolve,
        (reason) => {
          errors[i] = reason;
          rejectedCount++;

          if (rejectedCount === len) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        }
      );
    }
  });
}

/**
 * 第二版 myPromiseAny2
 *
 * 支持任意 iterable。
 * 先用 Array.from 统一转成数组，再复用数组逻辑。
 *
 * 比第一版更接近原生 Promise.any 的入参形态。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {Iterable<Promise<any> | any>} iterable
 * @return {Promise<any>}
 */
function myPromiseAny2(iterable) {
  return myPromiseAny1(Array.from(iterable));
}

/**
 * 第三版 myPromiseAny（面试推荐版）
 *
 * 支持 iterable，并保留每个 promise 对应位置的失败原因。
 *
 * 这版现场更推荐：
 * 1. Promise.resolve 包装普通值和 thenable。
 * 2. 空数组按规范 reject AggregateError。
 * 3. 全部失败时，errors 的顺序和输入顺序一致。
 * 4. 用 settled 标记避免某个成功后又被后续失败逻辑干扰理解。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {Iterable<Promise<any> | any>} iterable
 * @return {Promise<any>}
 */
function myPromiseAny(iterable) {
  return new Promise((resolve, reject) => {
    const promiseArr = Array.from(iterable);
    const len = promiseArr.length;
    const errors = new Array(len);
    let rejectedCount = 0;
    let settled = false;

    if (len === 0) {
      reject(new AggregateError([], "All promises were rejected"));
      return;
    }

    promiseArr.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          if (settled) return;
          settled = true;
          resolve(value);
        },
        (reason) => {
          if (settled) return;

          errors[index] = reason;
          rejectedCount++;

          if (rejectedCount === len) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        }
      );
    });
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    myPromiseAny1,
    myPromiseAny2,
    myPromiseAny,
  };
}
