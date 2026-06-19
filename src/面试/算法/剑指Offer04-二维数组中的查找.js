/**
 * 二维数组中的查找
 *
 * 剑指 Offer 04：
 * https://leetcode.cn/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/
 *
 * 题目：
 * 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，
 * 每一列都按照从上到下递增的顺序排序。
 * 请判断数组中是否含有某个整数 target。
 */

/**
 * 第一版 findNumberIn2DArray1
 *
 * 暴力扫描每个元素。
 *
 * 时间复杂度 O(mn)，空间复杂度 O(1)。
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function findNumberIn2DArray1(matrix, target) {
  for (const row of matrix) {
    for (const num of row) {
      if (num === target) return true;
    }
  }

  return false;
}

/**
 * 第二版 findNumberIn2DArray2
 *
 * 对每一行做二分查找。
 * 利用了每行递增，但没有充分利用每列递增。
 *
 * 时间复杂度 O(m log n)，空间复杂度 O(1)。
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function findNumberIn2DArray2(matrix, target) {
  for (const row of matrix) {
    let left = 0;
    let right = row.length - 1;

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (row[mid] === target) return true;
      if (row[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
  }

  return false;
}

/**
 * 第三版 findNumberIn2DArray（面试推荐版）
 *
 * 从右上角开始查找。
 * 右上角元素是当前行最大、当前列最小：
 * 1. 如果 current === target，找到。
 * 2. 如果 current > target，当前列都比 target 大，向左移动。
 * 3. 如果 current < target，当前行都比 target 小，向下移动。
 *
 * 时间复杂度 O(m + n)，空间复杂度 O(1)。
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function findNumberIn2DArray(matrix, target) {
  if (!matrix.length || !matrix[0].length) return false;

  let row = 0;
  let col = matrix[0].length - 1;

  while (row < matrix.length && col >= 0) {
    const current = matrix[row][col];
    if (current === target) return true;
    if (current > target) {
      col--;
    } else {
      row++;
    }
  }

  return false;
}

if (typeof module !== "undefined") {
  module.exports = {
    findNumberIn2DArray1,
    findNumberIn2DArray2,
    findNumberIn2DArray,
  };
}
