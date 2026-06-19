/**
 * 斐波那契数列
 *
 * 题目：
 * 给定非负整数 n，返回斐波那契数列第 n 项。
 *
 * 定义：
 * F(0) = 0
 * F(1) = 1
 * F(n) = F(n - 1) + F(n - 2)，n >= 2
 *
 * 这题常作为动态规划入门：从暴力递归到记忆化，再到滚动变量。
 */

/**
 * 第一版 fibonacci1
 *
 * 暴力递归。
 *
 * 时间复杂度 O(2^n)，空间复杂度 O(n)。
 * @param {number} n
 * @return {number}
 */
function fibonacci1(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("n 必须是非负整数");
  }
  if (n < 2) return n;

  return fibonacci1(n - 1) + fibonacci1(n - 2);
}

/**
 * 第二版 fibonacci2
 *
 * 记忆化递归。
 * 用 memo 保存已经算过的结果，避免重复计算。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {number} n
 * @return {number}
 */
function fibonacci2(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("n 必须是非负整数");
  }

  const memo = new Map([
    [0, 0],
    [1, 1],
  ]);

  function dfs(index) {
    if (memo.has(index)) return memo.get(index);

    const value = dfs(index - 1) + dfs(index - 2);
    memo.set(index, value);
    return value;
  }

  return dfs(n);
}

/**
 * 第三版 fibonacci（面试推荐版）
 *
 * 动态规划 + 滚动变量。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {number} n
 * @return {number}
 */
function fibonacci(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("n 必须是非负整数");
  }
  if (n < 2) return n;

  let prev = 0;
  let current = 1;

  for (let i = 2; i <= n; i++) {
    const next = prev + current;
    prev = current;
    current = next;
  }

  return current;
}

/**
 * 常见变体：结果需要对 1000000007 取模。
 * @param {number} n
 * @return {number}
 */
function fibonacciMod(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("n 必须是非负整数");
  }
  if (n < 2) return n;

  const mod = 1000000007;
  let prev = 0;
  let current = 1;

  for (let i = 2; i <= n; i++) {
    const next = (prev + current) % mod;
    prev = current;
    current = next;
  }

  return current;
}

if (typeof module !== "undefined") {
  module.exports = {
    fibonacci1,
    fibonacci2,
    fibonacci,
    fibonacciMod,
  };
}
