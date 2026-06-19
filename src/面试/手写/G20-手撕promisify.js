/**
 * 手撕 promisify
 *
 * promisify 的作用：
 * 把 Node 风格的 Error first callback 函数转换成返回 Promise 的函数。
 *
 * Node 风格回调约定：
 * callback(err, data)
 * err 有值表示失败，err 为空时后面的参数是成功结果。
 */

const customPromisify = typeof Symbol !== "undefined"
  ? Symbol.for("customPromisify")
  : "__customPromisify__";

/**
 * 第一版 promisify1
 *
 * 基础版。
 * 假设原函数最后一个参数一定是 callback，并且成功时只返回一个 data。
 *
 * 这版适合理解核心流程，但没有处理 this 和多返回值。
 *
 * @param {Function} fn
 * @return {Function}
 */
function promisify1(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
}

/**
 * 第二版 promisify2
 *
 * 保留 this 指向。
 * 使用 fn.call(this, ...args, callback)，支持对象方法被 promisify 后仍然访问原对象。
 *
 * @param {Function} fn
 * @return {Function}
 */
function promisify2(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
}

/**
 * 第三版 promisify（面试推荐版）
 *
 * 支持 this、custom 实现和多个成功返回值。
 *
 * 这版现场更推荐：
 * 1. fn 不是函数时抛 TypeError。
 * 2. 如果函数提供了自定义 promisify 实现，优先返回自定义版本。
 * 3. 保留调用时的 this。
 * 4. callback 成功返回多个值时，用数组返回，避免丢数据。
 *
 * @param {Function} fn
 * @return {Function}
 */
function promisify(fn) {
  if (typeof fn !== "function") {
    throw new TypeError("fn must be a function");
  }

  if (typeof fn[customPromisify] === "function") {
    return fn[customPromisify];
  }

  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, (err, ...values) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(values.length <= 1 ? values[0] : values);
      });
    });
  };
}

if (typeof module !== "undefined") {
  module.exports = {
    customPromisify,
    promisify1,
    promisify2,
    promisify,
  };
}
