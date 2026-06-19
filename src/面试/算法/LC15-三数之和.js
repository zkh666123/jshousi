/**
 * 三数之和
 *
 * Hot100 原题：
 * LeetCode 15. 三数之和
 * https://leetcode.cn/problems/3sum/
 *
 * 题目：
 * 给你一个整数数组 nums，判断是否存在三元组 [nums[i], nums[j], nums[k]]，
 * 满足 i、j、k 互不相同且 nums[i] + nums[j] + nums[k] === 0。
 * 返回所有不重复的三元组。
 *
 * 这题和两数之和的最大区别：
 * 1. 返回的是值，不是下标。
 * 2. 结果不能重复。
 * 3. 排序后用双指针能自然去重。
 */

/**
 * 第一版 threeSum1
 *
 * 三重循环暴力枚举所有三元组，再用 Set 去重。
 *
 * 时间复杂度 O(n^3)，空间复杂度 O(m)，m 是答案数量。
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum1(nums) {
  const set = new Set();

  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          const item = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
          set.add(item.join(","));
        }
      }
    }
  }

  return Array.from(set, (item) => item.split(",").map(Number));
}

/**
 * 第二版 threeSum2
 *
 * 排序 + 固定一个数 + 哈希表找另外两个数。
 * 每轮固定 nums[i]，剩下问题变成 twoSum。
 *
 * 这版比三重循环好，但去重逻辑没有双指针自然。
 *
 * 时间复杂度 O(n^2)，空间复杂度 O(n)。
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum2(nums) {
  const arr = nums.slice().sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < arr.length - 2; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) continue;

    const seen = new Set();
    const usedSecond = new Set();

    for (let j = i + 1; j < arr.length; j++) {
      const need = -arr[i] - arr[j];
      if (seen.has(need) && !usedSecond.has(need)) {
        result.push([arr[i], need, arr[j]]);
        usedSecond.add(need);
      }
      seen.add(arr[j]);
    }
  }

  return result;
}

/**
 * 第三版 threeSum（面试推荐版）
 *
 * 排序 + 双指针。
 * 固定 arr[i]，left/right 在右侧区间收缩：
 * 1. sum < 0，left 右移。
 * 2. sum > 0，right 左移。
 * 3. sum === 0，记录答案并跳过重复值。
 *
 * 面试官希望看到的关键点：
 * 1. i 要跳过重复值。
 * 2. 命中答案后 left/right 都要跳过重复值。
 * 3. arr[i] > 0 时可以提前结束。
 *
 * 时间复杂度 O(n^2)，空间复杂度 O(1)，不计算返回结果。
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {
  const arr = nums.slice().sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < arr.length - 2; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) continue;
    if (arr[i] > 0) break;

    let left = i + 1;
    let right = arr.length - 1;

    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right];

      if (sum < 0) {
        left++;
      } else if (sum > 0) {
        right--;
      } else {
        result.push([arr[i], arr[left], arr[right]]);

        while (left < right && arr[left] === arr[left + 1]) left++;
        while (left < right && arr[right] === arr[right - 1]) right--;

        left++;
        right--;
      }
    }
  }

  return result;
}

if (typeof module !== "undefined") {
  module.exports = {
    threeSum1,
    threeSum2,
    threeSum,
  };
}
