/**
 * 螺旋矩阵
 *
 * LeetCode 原题：
 * LeetCode 54. 螺旋矩阵
 * https://leetcode.cn/problems/spiral-matrix/
 *
 * 题目：
 * 给你一个 m 行 n 列的矩阵 matrix，请按照顺时针螺旋顺序返回矩阵中的所有元素。
 */

/**
 * 第一版 spiralOrder1
 *
 * 模拟访问 + visited 数组。
 * 按右、下、左、上的方向走，遇到边界或访问过的位置就转向。
 *
 * 时间复杂度 O(mn)，空间复杂度 O(mn)。
 * @param {number[][]} matrix
 * @return {number[]}
 */
function spiralOrder1(matrix) {
  if (!matrix.length || !matrix[0].length) return [];

  const rows = matrix.length;
  const cols = matrix[0].length;
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const result = [];
  let row = 0;
  let col = 0;
  let dir = 0;

  for (let count = 0; count < rows * cols; count++) {
    result.push(matrix[row][col]);
    visited[row][col] = true;

    const nextRow = row + directions[dir][0];
    const nextCol = col + directions[dir][1];

    if (
      nextRow < 0 ||
      nextRow >= rows ||
      nextCol < 0 ||
      nextCol >= cols ||
      visited[nextRow][nextCol]
    ) {
      dir = (dir + 1) % 4;
    }

    row += directions[dir][0];
    col += directions[dir][1];
  }

  return result;
}

/**
 * 第二版 spiralOrder2
 *
 * 按层遍历。
 * 每一层依次遍历上边、右边、下边、左边。
 *
 * 这版已经不需要 visited，但边界判断比较多。
 *
 * 时间复杂度 O(mn)，空间复杂度 O(1)，不计算返回结果。
 * @param {number[][]} matrix
 * @return {number[]}
 */
function spiralOrder2(matrix) {
  if (!matrix.length || !matrix[0].length) return [];

  const result = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let col = left; col <= right; col++) result.push(matrix[top][col]);
    for (let row = top + 1; row <= bottom; row++) result.push(matrix[row][right]);

    if (top < bottom && left < right) {
      for (let col = right - 1; col > left; col--) result.push(matrix[bottom][col]);
      for (let row = bottom; row > top; row--) result.push(matrix[row][left]);
    }

    top++;
    bottom--;
    left++;
    right--;
  }

  return result;
}

/**
 * 第三版 spiralOrder（面试推荐版）
 *
 * 四边界收缩。
 * 每走完一条边，就收缩对应边界，并检查是否还有合法区域。
 *
 * 面试官希望看到的关键点：
 * 1. top/bottom/left/right 分别表示当前还没访问的边界。
 * 2. 访问上边后 top++，访问右边后 right--。
 * 3. 访问下边和左边前要判断边界是否仍然有效，避免单行/单列重复访问。
 *
 * 时间复杂度 O(mn)，空间复杂度 O(1)，不计算返回结果。
 * @param {number[][]} matrix
 * @return {number[]}
 */
function spiralOrder(matrix) {
  if (!matrix.length || !matrix[0].length) return [];

  const result = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let col = left; col <= right; col++) result.push(matrix[top][col]);
    top++;

    for (let row = top; row <= bottom; row++) result.push(matrix[row][right]);
    right--;

    if (top <= bottom) {
      for (let col = right; col >= left; col--) result.push(matrix[bottom][col]);
      bottom--;
    }

    if (left <= right) {
      for (let row = bottom; row >= top; row--) result.push(matrix[row][left]);
      left++;
    }
  }

  return result;
}

if (typeof module !== "undefined") {
  module.exports = {
    spiralOrder1,
    spiralOrder2,
    spiralOrder,
  };
}
