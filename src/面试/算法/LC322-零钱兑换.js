/**
 * 零钱兑换
 *
 * Hot100 原题：
 * LeetCode 322. 零钱兑换
 * https://leetcode.cn/problems/coin-change/
 *
 * 题目：
 * 给你一个整数数组 coins，表示不同面额的硬币；再给一个整数 amount，表示总金额。
 * 计算可以凑成总金额所需的最少硬币个数；如果不能凑成，返回 -1。
 * 每种硬币数量无限。
 */

/**
 * 第一版 coinChange1
 *
 * 暴力递归。
 * 要凑 amount，可以先选择任意一枚 coin，然后递归求 amount - coin。
 *
 * 这版会重复计算大量子问题，amount 稍大就会超时。
 *
 * 时间复杂度指数级，空间复杂度 O(amount)。
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange1(coins, amount) {
  if (amount === 0) return 0;
  if (amount < 0) return -1;

  let min = Infinity;

  for (const coin of coins) {
    const sub = coinChange1(coins, amount - coin);
    if (sub !== -1) {
      min = Math.min(min, sub + 1);
    }
  }

  return min === Infinity ? -1 : min;
}

/**
 * 第二版 coinChange2
 *
 * 记忆化搜索。
 * 用 memo 记录每个剩余金额的最优答案，避免重复递归。
 *
 * 时间复杂度 O(amount * coins.length)，空间复杂度 O(amount)。
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange2(coins, amount) {
  const memo = new Map();

  function dfs(rest) {
    if (rest === 0) return 0;
    if (rest < 0) return -1;
    if (memo.has(rest)) return memo.get(rest);

    let min = Infinity;

    for (const coin of coins) {
      const sub = dfs(rest - coin);
      if (sub !== -1) {
        min = Math.min(min, sub + 1);
      }
    }

    const answer = min === Infinity ? -1 : min;
    memo.set(rest, answer);
    return answer;
  }

  return dfs(amount);
}

/**
 * 第三版 coinChange（面试推荐版）
 *
 * 自底向上动态规划。
 * dp[i] 表示凑出金额 i 需要的最少硬币数。
 * 初始化 dp[0] = 0，其余为 Infinity。
 * 遍历金额 i 时，尝试每个 coin，状态转移：
 * dp[i] = Math.min(dp[i], dp[i - coin] + 1)。
 *
 * 面试官希望看到的关键点：
 * 1. 这是完全背包最少数量问题。
 * 2. dp[0] 是 base case。
 * 3. 最后 dp[amount] 仍为 Infinity 时返回 -1。
 *
 * 时间复杂度 O(amount * coins.length)，空间复杂度 O(amount)。
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let current = 1; current <= amount; current++) {
    for (const coin of coins) {
      if (current >= coin) {
        dp[current] = Math.min(dp[current], dp[current - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

if (typeof module !== "undefined") {
  module.exports = {
    coinChange1,
    coinChange2,
    coinChange,
  };
}
