/**
 * 在排序数组中查找元素的第一个和最后一个位置
 *
 * Hot100 原题：
 * LeetCode 34. 在排序数组中查找元素的第一个和最后一个位置
 * https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/
 *
 * 题目：
 * 给你一个按非递减顺序排列的整数数组 nums，和一个目标值 target。
 * 找出 target 在数组中的开始位置和结束位置；不存在时返回 [-1, -1]。
 */

/**
 * 第一版 searchRange1
 *
 * 暴力扫描。
 * 从左到右记录第一次和最后一次出现的位置。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange1(nums, target) {
  let first = -1;
  let last = -1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      if (first === -1) first = i;
      last = i;
    }
  }

  return [first, last];
}

/**
 * 第二版 searchRange2
 *
 * 先普通二分找到任意一个 target，再向左右扩展。
 * 如果 target 重复很多，扩展部分仍可能退化到 O(n)。
 *
 * 时间复杂度最坏 O(n)，空间复杂度 O(1)。
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange2(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let index = -1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {
      index = mid;
      break;
    }
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  if (index === -1) return [-1, -1];

  let first = index;
  let last = index;
  while (first - 1 >= 0 && nums[first - 1] === target) first--;
  while (last + 1 < nums.length && nums[last + 1] === target) last++;

  return [first, last];
}

/**
 * 第三版 searchRange（面试推荐版）
 *
 * 两次二分：
 * 1. 第一次找左边界，也就是第一个 >= target 的位置。
 * 2. 第二次找右边界，也就是最后一个 <= target 的位置。
 *
 * 这版能保证题目要求的 O(log n)。
 *
 * 时间复杂度 O(log n)，空间复杂度 O(1)。
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange(nums, target) {
  return [findLeftBound(nums, target), findRightBound(nums, target)];
}

function findLeftBound(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let answer = -1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] >= target) {
      if (nums[mid] === target) answer = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return answer;
}

function findRightBound(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let answer = -1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] <= target) {
      if (nums[mid] === target) answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}

if (typeof module !== "undefined") {
  module.exports = {
    searchRange1,
    searchRange2,
    searchRange,
  };
}
