/**
 * 斐波那契数列
 *
 * 剑指 Offer 10-I：
 * https://leetcode.cn/problems/fei-bo-na-qi-shu-lie-lcof/
 *
 * 题目：
 * 写一个函数，输入 n，求斐波那契数列的第 n 项。
 * 答案需要对 1000000007 取模。
 */

/**
 * 第一版 fib1
 *
 * 暴力递归。
 * 直接按 fib(n) = fib(n - 1) + fib(n - 2) 递归。
 *
 * 时间复杂度 O(2^n)，空间复杂度 O(n)。
 * @param {number} n
 * @return {number}
 */
function fib1(n) {
  if (n < 2) return n;
  return (fib1(n - 1) + fib1(n - 2)) % 1000000007;
}

/**
 * 第二版 fib2
 *
 * 动态规划数组。
 * dp[i] 表示第 i 项斐波那契数。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {number} n
 * @return {number}
 */
function fib2(n) {
  if (n < 2) return n;

  const mod = 1000000007;
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % mod;
  }

  return dp[n];
}

/**
 * 第三版 fib（面试推荐版）
 *
 * 滚动变量。
 * 当前项只依赖前两项，所以不用保留完整 dp 数组。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {number} n
 * @return {number}
 */
function fib(n) {
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
    fib1,
    fib2,
    fib,
  };
}
