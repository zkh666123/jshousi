/**
 * 两数之和
 *
 * Hot100 原题：
 * LeetCode 1. 两数之和
 * https://leetcode.cn/problems/two-sum/
 *
 * 题目：
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为 target 的两个整数，
 * 并返回它们的数组下标。同一个元素不能使用两次。
 *
 * 面试里的关键点：
 * 1. 返回的是下标，所以不能先排序。
 * 2. Map 里存的是「已经遍历过的数字 -> 下标」。
 * 3. 先查 complement，再写入当前数字，避免同一个元素被使用两次。
 */

/**
 * 第一版 twoSum1
 *
 * 双重循环暴力枚举。
 * 固定 i 后枚举 i 右边的所有 j，找到 nums[i] + nums[j] === target 就返回。
 *
 * 时间复杂度 O(n^2)，空间复杂度 O(1)。
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum1(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }

  return [];
}

/**
 * 第二版 twoSum2
 *
 * 两趟哈希表。
 * 第一趟记录每个数字最后一次出现的下标；第二趟再查 target - nums[i]。
 *
 * 这版已经把查找从 O(n) 优化到 O(1)，但要额外注意不能命中自己。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum2(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i);
  }

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (map.has(need) && map.get(need) !== i) {
      return [i, map.get(need)];
    }
  }

  return [];
}

/**
 * 第三版 twoSum（面试推荐版）
 *
 * 一趟哈希表。
 * 遍历到 nums[i] 时，只需要检查 target - nums[i] 是否在前面出现过。
 *
 * 这版是现场最应该写出的版本：
 * 1. 一次遍历完成。
 * 2. 不排序，保留下标语义。
 * 3. 先查再存，天然避免复用当前元素。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (map.has(need)) {
      return [map.get(need), i];
    }
    map.set(nums[i], i);
  }

  return [];
}

if (typeof module !== "undefined") {
  module.exports = {
    twoSum1,
    twoSum2,
    twoSum,
  };
}
