/**
 * 子集
 *
 * Hot100 原题：
 * LeetCode 78. 子集
 * https://leetcode.cn/problems/subsets/
 *
 * 题目：
 * 给你一个整数数组 nums，数组中的元素互不相同。
 * 返回该数组所有可能的子集。
 */

/**
 * 第一版 subsets1
 *
 * 位掩码枚举。
 * n 个元素的每个元素都有选/不选两种状态，所以共有 2^n 个子集。
 *
 * 时间复杂度 O(n * 2^n)，空间复杂度 O(1)，不计算返回结果。
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsets1(nums) {
  const result = [];
  const total = 1 << nums.length;

  for (let mask = 0; mask < total; mask++) {
    const subset = [];
    for (let i = 0; i < nums.length; i++) {
      if (mask & (1 << i)) subset.push(nums[i]);
    }
    result.push(subset);
  }

  return result;
}

/**
 * 第二版 subsets2
 *
 * 递归选择/不选择。
 * 每个位置都有两个分支：不选 nums[index] 或选 nums[index]。
 *
 * 时间复杂度 O(n * 2^n)，空间复杂度 O(n)。
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsets2(nums) {
  const result = [];
  const path = [];

  function dfs(index) {
    if (index === nums.length) {
      result.push(path.slice());
      return;
    }

    dfs(index + 1);
    path.push(nums[index]);
    dfs(index + 1);
    path.pop();
  }

  dfs(0);
  return result;
}

/**
 * 第三版 subsets（面试推荐版）
 *
 * 回溯枚举每个子集起点。
 * 每到一个节点，都先把当前 path 加入结果；然后从 start 开始选择后续元素。
 *
 * 这版是子集/组合类最通用模板：
 * 1. start 保证每个元素只向后选择，不会重复。
 * 2. 每个递归节点都是一个合法子集。
 * 3. 很容易扩展到组合、去重子集等题。
 *
 * 时间复杂度 O(n * 2^n)，空间复杂度 O(n)。
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsets(nums) {
  const result = [];
  const path = [];

  function backtrack(start) {
    result.push(path.slice());

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  }

  backtrack(0);
  return result;
}

if (typeof module !== "undefined") {
  module.exports = {
    subsets1,
    subsets2,
    subsets,
  };
}
