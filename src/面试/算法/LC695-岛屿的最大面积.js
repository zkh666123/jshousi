/**
 * 岛屿的最大面积
 *
 * LeetCode 原题：
 * LeetCode 695. 岛屿的最大面积
 * https://leetcode.cn/problems/max-area-of-island/
 *
 * 题目：
 * 给你一个由 0 和 1 组成的非空二维数组 grid。
 * 岛屿由四个方向相连的 1 组成，返回网格中岛屿的最大面积。
 */

/**
 * 第一版 maxAreaOfIsland1
 *
 * DFS + visited。
 * 每遇到一个未访问陆地，就 DFS 统计这座岛面积。
 *
 * 时间复杂度 O(mn)，空间复杂度 O(mn)。
 * @param {number[][]} grid
 * @return {number}
 */
function maxAreaOfIsland1(grid) {
  if (!grid.length || !grid[0].length) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
  let max = 0;

  function dfs(row, col) {
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      visited[row][col] ||
      grid[row][col] !== 1
    ) {
      return 0;
    }

    visited[row][col] = true;
    return (
      1 +
      dfs(row + 1, col) +
      dfs(row - 1, col) +
      dfs(row, col + 1) +
      dfs(row, col - 1)
    );
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 1 && !visited[row][col]) {
        max = Math.max(max, dfs(row, col));
      }
    }
  }

  return max;
}

/**
 * 第二版 maxAreaOfIsland2
 *
 * BFS + visited。
 * 用队列统计当前岛屿面积。
 *
 * 时间复杂度 O(mn)，空间复杂度 O(mn)。
 * @param {number[][]} grid
 * @return {number}
 */
function maxAreaOfIsland2(grid) {
  if (!grid.length || !grid[0].length) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let max = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] !== 1 || visited[row][col]) continue;

      let area = 0;
      const queue = [[row, col]];
      let head = 0;
      visited[row][col] = true;

      while (head < queue.length) {
        const [currentRow, currentCol] = queue[head++];
        area++;

        for (const [dr, dc] of directions) {
          const nextRow = currentRow + dr;
          const nextCol = currentCol + dc;

          if (
            nextRow >= 0 &&
            nextRow < rows &&
            nextCol >= 0 &&
            nextCol < cols &&
            grid[nextRow][nextCol] === 1 &&
            !visited[nextRow][nextCol]
          ) {
            visited[nextRow][nextCol] = true;
            queue.push([nextRow, nextCol]);
          }
        }
      }

      max = Math.max(max, area);
    }
  }

  return max;
}

/**
 * 第三版 maxAreaOfIsland（面试推荐版）
 *
 * DFS 原地沉岛并返回面积。
 * 访问过的陆地直接改成 0，避免重复统计。
 *
 * 时间复杂度 O(mn)，空间复杂度 O(mn)，最坏来自递归栈。
 * @param {number[][]} grid
 * @return {number}
 */
function maxAreaOfIsland(grid) {
  if (!grid.length || !grid[0].length) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let max = 0;

  function dfs(row, col) {
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      grid[row][col] !== 1
    ) {
      return 0;
    }

    grid[row][col] = 0;
    return (
      1 +
      dfs(row + 1, col) +
      dfs(row - 1, col) +
      dfs(row, col + 1) +
      dfs(row, col - 1)
    );
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 1) {
        max = Math.max(max, dfs(row, col));
      }
    }
  }

  return max;
}

if (typeof module !== "undefined") {
  module.exports = {
    maxAreaOfIsland1,
    maxAreaOfIsland2,
    maxAreaOfIsland,
  };
}
