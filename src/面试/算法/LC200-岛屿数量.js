/**
 * 岛屿数量
 *
 * Hot100 原题：
 * LeetCode 200. 岛屿数量
 * https://leetcode.cn/problems/number-of-islands/
 *
 * 题目：
 * 给你一个由 "1"（陆地）和 "0"（水）组成的二维网格，请你计算网格中岛屿的数量。
 * 岛屿总是被水包围，并且每座岛只能由水平方向或竖直方向相邻的陆地连接形成。
 */

/**
 * 第一版 numIslands1
 *
 * 暴力 DFS + visited。
 * 遍历每个格子，遇到未访问过的陆地就把整座岛 DFS 标记掉，并把答案加 1。
 *
 * 时间复杂度 O(mn)，空间复杂度 O(mn)。
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands1(grid) {
  if (!grid.length || !grid[0].length) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
  let count = 0;

  function dfs(row, col) {
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      visited[row][col] ||
      grid[row][col] !== "1"
    ) {
      return;
    }

    visited[row][col] = true;
    dfs(row + 1, col);
    dfs(row - 1, col);
    dfs(row, col + 1);
    dfs(row, col - 1);
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === "1" && !visited[row][col]) {
        count++;
        dfs(row, col);
      }
    }
  }

  return count;
}

/**
 * 第二版 numIslands2
 *
 * BFS + visited。
 * 和 DFS 思路一致，只是用队列扩展整座岛。
 *
 * 时间复杂度 O(mn)，空间复杂度 O(mn)。
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands2(grid) {
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
  let count = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] !== "1" || visited[row][col]) continue;

      count++;
      const queue = [[row, col]];
      let head = 0;
      visited[row][col] = true;

      while (head < queue.length) {
        const [currentRow, currentCol] = queue[head++];

        for (const [dr, dc] of directions) {
          const nextRow = currentRow + dr;
          const nextCol = currentCol + dc;

          if (
            nextRow >= 0 &&
            nextRow < rows &&
            nextCol >= 0 &&
            nextCol < cols &&
            grid[nextRow][nextCol] === "1" &&
            !visited[nextRow][nextCol]
          ) {
            visited[nextRow][nextCol] = true;
            queue.push([nextRow, nextCol]);
          }
        }
      }
    }
  }

  return count;
}

/**
 * 第三版 numIslands（面试推荐版）
 *
 * DFS 原地沉岛。
 * 遇到一块陆地，就把与它连通的所有 "1" 改成 "0"，
 * 表示这座岛已经被访问过。
 *
 * 这版现场最推荐写：
 * 1. 不需要额外 visited 数组。
 * 2. 代码短，网格 DFS 模板清楚。
 * 3. 如果面试官强调不能修改输入，可以复制 grid 或改用 visited 版。
 *
 * 时间复杂度 O(mn)，空间复杂度 O(mn)，最坏来自递归栈。
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
  if (!grid.length || !grid[0].length) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function sink(row, col) {
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      grid[row][col] !== "1"
    ) {
      return;
    }

    grid[row][col] = "0";
    sink(row + 1, col);
    sink(row - 1, col);
    sink(row, col + 1);
    sink(row, col - 1);
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === "1") {
        count++;
        sink(row, col);
      }
    }
  }

  return count;
}

if (typeof module !== "undefined") {
  module.exports = {
    numIslands1,
    numIslands2,
    numIslands,
  };
}
