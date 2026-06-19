/**
 * 最长递增子序列
 *
 * Hot100 原题：
 * LeetCode 300. 最长递增子序列
 * https://leetcode.cn/problems/longest-increasing-subsequence/
 *
 * 题目：
 * 给你一个整数数组 nums，找到其中最长严格递增子序列的长度。
 *
 * 注意：
 * 子序列不要求连续，但相对顺序不能改变。
 */

/**
 * 第一版 lengthOfLIS1
 *
 * 暴力回溯。
 * 每个位置都有选或不选两种选择，并用 prevIndex 保证递增。
 *
 * 时间复杂度 O(2^n)，空间复杂度 O(n)。
 * @param {number[]} nums
 * @return {number}
 */
function lengthOfLIS1(nums) {
  function dfs(index, prevIndex) {
    if (index === nums.length) return 0;

    let notChoose = dfs(index + 1, prevIndex);
    let choose = 0;

    if (prevIndex === -1 || nums[index] > nums[prevIndex]) {
      choose = 1 + dfs(index + 1, index);
    }

    return Math.max(choose, notChoose);
  }

  return dfs(0, -1);
}

/**
 * 第二版 lengthOfLIS2
 *
 * 动态规划。
 * dp[i] 表示以 nums[i] 结尾的最长递增子序列长度。
 *
 * 时间复杂度 O(n^2)，空间复杂度 O(n)。
 * @param {number[]} nums
 * @return {number}
 */
function lengthOfLIS2(nums) {
  if (!nums.length) return 0;

  const dp = new Array(nums.length).fill(1);
  let answer = 1;

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    answer = Math.max(answer, dp[i]);
  }

  return answer;
}

/**
 * 第三版 lengthOfLIS（面试推荐版）
 *
 * 贪心 + 二分。
 * tails[len - 1] 表示长度为 len 的递增子序列中，结尾元素的最小可能值。
 * 遍历每个 num，用二分找到 tails 中第一个 >= num 的位置并替换。
 *
 * 为什么正确：
 * 结尾越小，后面越容易接上更大的数字，所以同样长度下只保留最小结尾。
 *
 * 时间复杂度 O(n log n)，空间复杂度 O(n)。
 * @param {number[]} nums
 * @return {number}
 */
function lengthOfLIS(nums) {
  const tails = [];

  for (const num of nums) {
    let left = 0;
    let right = tails.length;

    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    tails[left] = num;
  }

  return tails.length;
}

if (typeof module !== "undefined") {
  module.exports = {
    lengthOfLIS1,
    lengthOfLIS2,
    lengthOfLIS,
  };
}
