/**
 * 买卖股票的最佳时机
 *
 * Hot100 原题：
 * LeetCode 121. 买卖股票的最佳时机
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/
 *
 * 题目：
 * 给定一个数组 prices，prices[i] 表示某支股票第 i 天的价格。
 * 你只能选择某一天买入，并在未来某一天卖出，求最大利润。
 * 如果不能获得利润，返回 0。
 */

/**
 * 第一版 maxProfit1
 *
 * 暴力枚举买入日和卖出日。
 *
 * 时间复杂度 O(n^2)，空间复杂度 O(1)。
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit1(prices) {
  let max = 0;

  for (let buy = 0; buy < prices.length; buy++) {
    for (let sell = buy + 1; sell < prices.length; sell++) {
      max = Math.max(max, prices[sell] - prices[buy]);
    }
  }

  return max;
}

/**
 * 第二版 maxProfit2
 *
 * 动态规划。
 * hold 表示第 i 天结束后手里持有股票时的最大收益；
 * cash 表示第 i 天结束后手里不持有股票时的最大收益。
 *
 * 因为只能交易一次，hold = max(hold, -price)，cash = max(cash, hold + price)。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit2(prices) {
  let hold = -Infinity;
  let cash = 0;

  for (const price of prices) {
    hold = Math.max(hold, -price);
    cash = Math.max(cash, hold + price);
  }

  return cash;
}

/**
 * 第三版 maxProfit（面试推荐版）
 *
 * 一次遍历维护历史最低买入价。
 * 第 i 天卖出能获得的最大利润，就是 prices[i] - 之前出现过的最低价格。
 *
 * 面试官希望看到的关键点：
 * 1. 买入日必须在卖出日前面，所以 minPrice 只来自当前天之前或当前天。
 * 2. 每天都尝试用当天价格卖出。
 * 3. 再更新历史最低价。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
  let minPrice = Infinity;
  let max = 0;

  for (const price of prices) {
    max = Math.max(max, price - minPrice);
    minPrice = Math.min(minPrice, price);
  }

  return max;
}

if (typeof module !== "undefined") {
  module.exports = {
    maxProfit1,
    maxProfit2,
    maxProfit,
  };
}
