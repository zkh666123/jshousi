/**
 * 二叉树的最大深度
 *
 * Hot100 原题：
 * LeetCode 104. 二叉树的最大深度
 * https://leetcode.cn/problems/maximum-depth-of-binary-tree/
 *
 * 题目：
 * 给定一个二叉树 root，返回其最大深度。
 * 最大深度是从根节点到最远叶子节点的最长路径上的节点数。
 */

/**
 * 第一版 maxDepth1
 *
 * DFS 遍历所有路径。
 * 用外部变量 answer 记录访问到的最大 depth。
 *
 * 时间复杂度 O(n)，空间复杂度 O(h)。
 * @param {TreeNode | null} root
 * @return {number}
 */
function maxDepth1(root) {
  let answer = 0;

  function dfs(node, depth) {
    if (!node) return;

    answer = Math.max(answer, depth);
    dfs(node.left, depth + 1);
    dfs(node.right, depth + 1);
  }

  dfs(root, 1);
  return answer;
}

/**
 * 第二版 maxDepth2
 *
 * BFS 层序遍历。
 * 每处理完一层，深度加 1。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {TreeNode | null} root
 * @return {number}
 */
function maxDepth2(root) {
  if (!root) return 0;

  const queue = [root];
  let head = 0;
  let depth = 0;

  while (head < queue.length) {
    const levelEnd = queue.length;

    for (let i = head; i < levelEnd; i++) {
      const node = queue[i];
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    head = levelEnd;
    depth++;
  }

  return depth;
}

/**
 * 第三版 maxDepth（面试推荐版）
 *
 * 分治递归。
 * 当前树的最大深度 = 左子树最大深度和右子树最大深度的较大值 + 1。
 *
 * 这版现场最推荐写：
 * 1. 定义清晰。
 * 2. 代码短。
 * 3. 能体现二叉树递归问题的子问题思想。
 *
 * 时间复杂度 O(n)，空间复杂度 O(h)。
 * @param {TreeNode | null} root
 * @return {number}
 */
function maxDepth(root) {
  if (!root) return 0;

  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

if (typeof module !== "undefined") {
  module.exports = {
    maxDepth1,
    maxDepth2,
    maxDepth,
  };
}
