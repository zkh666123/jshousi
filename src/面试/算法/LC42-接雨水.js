/**
 * 接雨水
 *
 * Hot100 原题：
 * LeetCode 42. 接雨水
 * https://leetcode.cn/problems/trapping-rain-water/
 *
 * 题目：
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 */

/**
 * 第一版 trap1
 *
 * 暴力枚举每个位置。
 * 对于位置 i，向左找最高柱，向右找最高柱，
 * 当前位置能接的水是 min(leftMax, rightMax) - height[i]。
 *
 * 时间复杂度 O(n^2)，空间复杂度 O(1)。
 * @param {number[]} height
 * @return {number}
 */
function trap1(height) {
  let water = 0;

  for (let i = 0; i < height.length; i++) {
    let leftMax = 0;
    let rightMax = 0;

    for (let left = i; left >= 0; left--) {
      leftMax = Math.max(leftMax, height[left]);
    }
    for (let right = i; right < height.length; right++) {
      rightMax = Math.max(rightMax, height[right]);
    }

    water += Math.min(leftMax, rightMax) - height[i];
  }

  return water;
}

/**
 * 第二版 trap2
 *
 * 前后缀最大值。
 * 预处理 leftMax[i] 和 rightMax[i]，让每个位置能 O(1) 算出接水量。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {number[]} height
 * @return {number}
 */
function trap2(height) {
  if (!height.length) return 0;

  const n = height.length;
  const leftMax = new Array(n);
  const rightMax = new Array(n);
  let water = 0;

  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  for (let i = 0; i < n; i++) {
    water += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return water;
}

/**
 * 第三版 trap（面试推荐版）
 *
 * 双指针。
 * leftMax 是左侧最高柱，rightMax 是右侧最高柱。
 * 哪边较矮，哪边的接水量就可以确定，因为短板已经由较矮侧决定。
 *
 * 面试官希望看到的关键点：
 * 1. left/right 从两端向中间收缩。
 * 2. height[left] < height[right] 时处理 left。
 * 3. 否则处理 right。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }

  return water;
}

if (typeof module !== "undefined") {
  module.exports = {
    trap1,
    trap2,
    trap,
  };
}
