/**
 * repeat
 *
 * _.repeat([string=''], [n=1])：String
 * _.repeat('abc', 2); => 'abcabc'
 */

// 与原生 String.prototype.repeat 对齐：n 取整、负数/Infinity 报错
function normalizeCount(n) {
  n = Number(n);
  if (!Number.isFinite(n) || n < 0) {
    throw new RangeError("Invalid count value");
  }
  return Math.floor(n);
}

// 方法一 递归实现
function repeat(src, n) {
  n = normalizeCount(n);
  return n > 0 ? src.concat(repeat(src, n - 1)) : "";
}

// 方法二 倍增（O(log n)）
function repeat(src, n) {
  n = normalizeCount(n);
  let s = src;
  let total = "";
  while (n > 0) {
    if (n % 2 === 1) total += s;
    if (n === 1) break;
    s += s;
    n = Math.floor(n / 2); // 必须整除，否则奇数次会进入死循环或异常
  }
  return total;
}

// 方法三 数组实现
function repeat(src, n) {
  n = normalizeCount(n);
  return new Array(n + 1).join(src);
}

