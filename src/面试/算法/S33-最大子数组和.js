/**
 * 最大子数组和
 *
 * Hot100 原题：
 * LeetCode 53. 最大子数组和
 * https://leetcode.cn/problems/maximum-subarray/
 *
 * 给定一个整数数组 nums，找到一个具有最大和的连续子数组，返回其最大和。
 * 这里的关键词是「连续」，所以不能像子序列那样随便跳着选元素。
 *
 * 经典解法是 Kadane 动态规划：
 * 1. 定义 dp 为「以当前元素结尾的最大连续子数组和」。
 * 2. 遍历到 nums[i] 时只有两种选择：
 *    - 接在前面的连续子数组后面：dp + nums[i]
 *    - 从当前元素重新开始：nums[i]
 * 3. 所以状态转移方程是 dp = Math.max(nums[i], dp + nums[i])。
 * 4. 每一步再用 max 记录遍历过程中出现过的最大 dp。
 *
 * 为什么不能遇到负数就直接丢掉：
 * 负数不一定无用。例如 [5, -1, 5] 中间的 -1 必须保留，最大和是 9。
 * 真正该丢掉的是「加上当前值以后反而不如从当前值重新开始」的前缀。
 *
 * 边界情况：
 * 1. 数组全是负数时，答案是最大的那个负数，而不是 0。
 * 2. 空数组这里返回 0，方便函数在普通 JS 场景中使用；LeetCode 原题通常保证非空。
 *
 * 时间复杂度 O(n)，只遍历一次数组。
 * 空间复杂度 O(1)，只维护当前状态和最大值。
 */

/**
 * 第一版 maxSubArray
 *
 * 枚举所有连续子数组，边累加边更新最大值。
 * 不再每次 slice 后 reduce，所以比 O(n^3) 的暴力写法更好，但仍然是 O(n^2)。
 *
 * 时间复杂度 O(n^2)，空间复杂度 O(1)。
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray1(nums) {
  if (!nums.length) return 0;

  let max = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      max = Math.max(max, sum);
    }
  }

  return max;
}

/**
 * 第二版 maxSubArray
 *
 * 动态规划数组。
 * dp[i] 表示以 nums[i] 结尾的最大连续子数组和。
 * 状态转移：dp[i] = Math.max(nums[i], dp[i - 1] + nums[i])。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray2(nums) {
  if (!nums.length) return 0;

  const dp = new Array(nums.length);
  dp[0] = nums[0];
  let max = nums[0];

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
    max = Math.max(max, dp[i]);
  }

  return max;
}

/**
 * 第三版 maxSubArray（面试推荐版）
 *
 * Kadane 动态规划，把 dp 数组压缩成一个变量。
 * dp 表示以当前元素结尾的最大连续子数组和。
 *
 * 这版是现场最应该写出的版本：
 * 1. 先处理空数组；原题一般非空，工程里保守返回 0。
 * 2. max 初始化为 nums[0]，保证全负数场景正确。
 * 3. 只维护当前 dp 和全局 max，不额外开数组。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  if (!nums.length) return 0;

  let dp = nums[0];
  let max = nums[0];

  for (let i = 1; i < nums.length; i++) {
    dp = Math.max(nums[i], dp + nums[i]);
    max = Math.max(max, dp);
  }

  return max;
}

if (typeof module !== "undefined") {
  module.exports = {
    maxSubArray1,
    maxSubArray2,
    maxSubArray,
  };
}
