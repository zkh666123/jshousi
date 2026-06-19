/**
 * 爬楼梯
 *
 * Hot100 原题：
 * LeetCode 70. 爬楼梯
 * https://leetcode.cn/problems/climbing-stairs/
 *
 * 题目：
 * 假设你正在爬楼梯，需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶，问有多少种不同的方法可以爬到楼顶。
 *
 * 本质：
 * 最后一步只有两种可能：
 * 1. 从第 n - 1 阶爬 1 阶上来。
 * 2. 从第 n - 2 阶爬 2 阶上来。
 * 所以 dp[n] = dp[n - 1] + dp[n - 2]。
 */

/**
 * 第一版 climbStairs1
 *
 * 暴力递归。
 * 直接按定义拆成 climb(n - 1) + climb(n - 2)。
 *
 * 这版会大量重复计算，n 稍大就会很慢。
 *
 * 时间复杂度 O(2^n)，空间复杂度 O(n)。
 * @param {number} n
 * @return {number}
 */
function climbStairs1(n) {
  if (n <= 2) return n;
  return climbStairs1(n - 1) + climbStairs1(n - 2);
}

/**
 * 第二版 climbStairs2
 *
 * 动态规划数组。
 * dp[i] 表示爬到第 i 阶的方法数。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {number} n
 * @return {number}
 */
function climbStairs2(n) {
  if (n <= 2) return n;

  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

/**
 * 第三版 climbStairs（面试推荐版）
 *
 * 动态规划 + 滚动变量。
 * 当前状态只依赖前两个状态，不需要保留完整 dp 数组。
 *
 * 这版现场最推荐写：
 * 1. 复杂度最优且代码短。
 * 2. 不会有递归栈溢出。
 * 3. 可以顺手解释这是斐波那契变体。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  if (n <= 2) return n;

  let prev = 1;
  let current = 2;

  for (let i = 3; i <= n; i++) {
    const next = prev + current;
    prev = current;
    current = next;
  }

  return current;
}

if (typeof module !== "undefined") {
  module.exports = {
    climbStairs1,
    climbStairs2,
    climbStairs,
  };
}
