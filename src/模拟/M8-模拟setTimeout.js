/**
 * 实现 setTimeout
 * 
 * 利用 requestAnimationFrame
 * 
 * 第一个参数为函数或可执行的字符串(比如 alert('test') ，此法不建议使用)
 * 第二个参数 为延迟毫秒数 ，可选的，默认值为 0
 * 第三个及后面的参数为函数的入参
 * setTimeout 的返回值是一个数字，这个成为 timeoutID ，可以用于取消该定时器
 * 
 * JavaScript 定时器函数像 setTimeout 和 setInterval 都不是 ECMAScript 规范或者任何 JavaScript 实现的一部分。
 * 定时器功能由浏览器实现，它们的实现在不同浏览器之间会有所不同。 定时器也可以由 Node.js 运行时本身实现。
 */

// 用 requestAnimationFrame 模拟 setTimeout/clearTimeout
// 返回 handle 对象作为 timerID，配套的 clearTimeout 通过该 handle 取消
const mySetTimeout = (fn, timeout = 0, ...args) => {
  const start = +new Date();
  const handle = { rafId: 0, cancelled: false };
  const loop = () => {
    if (handle.cancelled) return;
    const now = +new Date();
    if (now - start >= timeout) {
      fn(...args);
    } else {
      handle.rafId = window.requestAnimationFrame(loop);
    }
  };
  handle.rafId = window.requestAnimationFrame(loop);
  return handle;
};

const myClearTimeout = (handle) => {
  if (!handle) return;
  handle.cancelled = true;
  window.cancelAnimationFrame(handle.rafId);
};

function showName() {
  console.log("Hello");
}
const timerID = mySetTimeout(showName, 1000);
// myClearTimeout(timerID); // 取消定时器
