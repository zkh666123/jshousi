/**
 * 滑动窗口最大值
 *
 * Hot100 原题：
 * LeetCode 239. 滑动窗口最大值
 * https://leetcode.cn/problems/sliding-window-maximum/
 *
 * 给定数组 nums 和窗口大小 k，窗口每次向右移动一位，返回每个窗口中的最大值。
 * 暴力做法是每个窗口都重新扫描 k 个元素，时间复杂度 O(n * k)，k 较大时会超时。
 *
 * 核心思路：单调队列
 * 1. 队列里保存的是数组下标，而不是值。
 * 2. 队列从头到尾对应的值保持单调递减。
 * 3. 队头下标永远是当前窗口最大值的下标。
 *
 * 为什么队列能保持单调：
 * 遍历到 nums[i] 时，如果队尾元素小于等于 nums[i]，它以后不可能再成为最大值：
 * - 它比 nums[i] 小；
 * - 它还比 nums[i] 更早离开窗口。
 * 所以可以不断弹出队尾，直到队列重新满足单调递减。
 *
 * 为什么保存下标：
 * 只有下标才能判断元素是否已经滑出窗口。
 * 当 queue[head] <= i - k 时，说明队头已经不在当前窗口 [i-k+1, i] 中，需要移出。
 *
 * 注意点：
 * 1. i >= k - 1 时，窗口才形成，才能开始收集答案。
 * 2. 这里用 head 指针代替 shift()，避免数组头部删除带来的 O(n) 移动成本。
 * 3. k <= 0 或 k 大于数组长度时，这里返回空数组。
 *
 * 时间复杂度 O(n)：每个下标最多入队一次、出队一次。
 * 空间复杂度 O(k)：队列最多保存一个窗口内的下标。
 */

/**
 * 第一版 maxSlidingWindow
 *
 * 暴力枚举每个窗口，在窗口内部重新找最大值。
 * 思路简单，但窗口大小 k 较大时会超时。
 *
 * 时间复杂度 O(n * k)，空间复杂度 O(1)，不计算返回结果。
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function maxSlidingWindow1(nums, k) {
  if (!nums.length || k <= 0 || k > nums.length) return [];

  const result = [];
  for (let i = 0; i <= nums.length - k; i++) {
    let max = nums[i];
    for (let j = i + 1; j < i + k; j++) {
      max = Math.max(max, nums[j]);
    }
    result.push(max);
  }

  return result;
}

/**
 * 第二版 maxSlidingWindow
 *
 * 单调队列保存下标，队头始终是当前窗口最大值下标。
 * 这一版使用 queue.shift() 移除过期下标，思路清楚，但 JS 数组头删会移动元素。
 *
 * 算法意义上时间复杂度 O(n)，但在 JS 中 shift() 可能带来额外移动成本。
 * 空间复杂度 O(k)。
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function maxSlidingWindow2(nums, k) {
  if (!nums.length || k <= 0 || k > nums.length) return [];

  const queue = [];
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    while (queue.length && queue[0] <= i - k) {
      queue.shift();
    }

    while (queue.length && nums[queue[queue.length - 1]] <= nums[i]) {
      queue.pop();
    }

    queue.push(i);

    if (i >= k - 1) {
      result.push(nums[queue[0]]);
    }
  }

  return result;
}

/**
 * 第三版 maxSlidingWindow（面试推荐版）
 *
 * 单调队列 + head 指针。
 * 和第二版思路一致，但不用 shift()，避免 JS 数组头部删除的隐藏成本。
 *
 * 面试官希望看到的关键点：
 * 1. 队列存下标，不存值，便于判断元素是否过期。
 * 2. 入队前弹出队尾所有小于等于当前值的下标，保证队列单调递减。
 * 3. 队头如果已经滑出窗口，就移动 head。
 * 4. i >= k - 1 时窗口才形成。
 *
 * 时间复杂度 O(n)，空间复杂度 O(k)。
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function maxSlidingWindow(nums, k) {
  if (!nums.length || k <= 0 || k > nums.length) return [];

  const queue = [];
  const result = [];
  let head = 0;

  for (let i = 0; i < nums.length; i++) {
    while (head < queue.length && queue[head] <= i - k) {
      head++;
    }

    while (head < queue.length && nums[queue[queue.length - 1]] <= nums[i]) {
      queue.pop();
    }

    queue.push(i);

    if (i >= k - 1) {
      result.push(nums[queue[head]]);
    }
  }

  return result;
}

if (typeof module !== "undefined") {
  module.exports = {
    maxSlidingWindow1,
    maxSlidingWindow2,
    maxSlidingWindow,
  };
}
