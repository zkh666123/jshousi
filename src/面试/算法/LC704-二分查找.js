/**
 * 二分查找
 *
 * LeetCode 原题：
 * LeetCode 704. 二分查找
 * https://leetcode.cn/problems/binary-search/
 *
 * 题目：
 * 给定一个升序数组 nums 和一个目标值 target，返回 target 在数组中的下标；
 * 如果不存在，返回 -1。
 *
 * 二分查找的前提是数组有序。每次比较中点，都能排除一半搜索空间。
 */

/**
 * 第一版 search1
 *
 * 暴力线性扫描。
 * 没有利用有序条件，只作为理解题意的起点。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search1(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) return i;
  }

  return -1;
}

/**
 * 第二版 search2
 *
 * 递归二分。
 * 每次递归只处理剩下的一半区间。
 *
 * 时间复杂度 O(log n)，空间复杂度 O(log n)。
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search2(nums, target) {
  function dfs(left, right) {
    if (left > right) return -1;

    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) return dfs(mid + 1, right);
    return dfs(left, mid - 1);
  }

  return dfs(0, nums.length - 1);
}

/**
 * 第三版 search（面试推荐版）
 *
 * 迭代二分，闭区间 [left, right]。
 *
 * 现场最推荐写这个版本：
 * 1. while 条件是 left <= right。
 * 2. mid 使用 left + Math.floor((right - left) / 2)。
 * 3. nums[mid] 小于 target 时，left = mid + 1。
 * 4. nums[mid] 大于 target 时，right = mid - 1。
 *
 * 时间复杂度 O(log n)，空间复杂度 O(1)。
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

if (typeof module !== "undefined") {
  module.exports = {
    search1,
    search2,
    search,
  };
}
