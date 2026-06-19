/**
 * 合并两个有序数组
 *
 * LeetCode 原题：
 * LeetCode 88. 合并两个有序数组
 * https://leetcode.cn/problems/merge-sorted-array/
 *
 * 题目：
 * 给你两个按非递减顺序排列的整数数组 nums1 和 nums2。
 * nums1 的长度为 m + n，其中前 m 个元素有效，后 n 个位置为 0，用来容纳 nums2。
 * 请把 nums2 合并到 nums1 中，使 nums1 成为非递减顺序数组。
 *
 * 这题要求原地修改 nums1，不需要返回新数组。
 */

/**
 * 第一版 merge1
 *
 * 暴力版。
 * 把 nums2 复制到 nums1 后面，再整体排序。
 *
 * 时间复杂度 O((m + n) log(m + n))，空间复杂度取决于 sort 实现。
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void}
 */
function merge1(nums1, m, nums2, n) {
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i];
  }

  nums1.sort((a, b) => a - b);
}

/**
 * 第二版 merge2
 *
 * 正向双指针。
 * 先复制 nums1 前 m 个有效元素，再从两个数组头部开始合并回 nums1。
 *
 * 时间复杂度 O(m + n)，空间复杂度 O(m)。
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void}
 */
function merge2(nums1, m, nums2, n) {
  const copy = nums1.slice(0, m);
  let i = 0;
  let j = 0;
  let write = 0;

  while (i < m && j < n) {
    if (copy[i] <= nums2[j]) {
      nums1[write++] = copy[i++];
    } else {
      nums1[write++] = nums2[j++];
    }
  }

  while (i < m) nums1[write++] = copy[i++];
  while (j < n) nums1[write++] = nums2[j++];
}

/**
 * 第三版 merge（面试推荐版）
 *
 * 逆向双指针。
 * nums1 后面本来就有 n 个空位，所以从后往前放较大的元素，不会覆盖还没比较的 nums1 有效值。
 *
 * 面试官希望看到的关键点：
 * 1. p1 指向 nums1 有效区末尾，p2 指向 nums2 末尾。
 * 2. write 指向 nums1 的最终写入位置。
 * 3. 谁大放谁，最后如果 nums2 还有剩余，继续拷贝。
 *
 * 时间复杂度 O(m + n)，空间复杂度 O(1)。
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void}
 */
function merge(nums1, m, nums2, n) {
  let p1 = m - 1;
  let p2 = n - 1;
  let write = m + n - 1;

  while (p1 >= 0 && p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[write--] = nums1[p1--];
    } else {
      nums1[write--] = nums2[p2--];
    }
  }

  while (p2 >= 0) {
    nums1[write--] = nums2[p2--];
  }
}

if (typeof module !== "undefined") {
  module.exports = {
    merge1,
    merge2,
    merge,
  };
}
