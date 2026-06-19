/**
 * 路径总和
 *
 * LeetCode 原题：
 * LeetCode 112. 路径总和
 * https://leetcode.cn/problems/path-sum/
 *
 * 题目：
 * 给你二叉树的根节点 root 和一个目标和 targetSum。
 * 判断该树中是否存在根节点到叶子节点的路径，使路径上所有节点值相加等于 targetSum。
 */

/**
 * 第一版 hasPathSum1
 *
 * DFS 收集所有根到叶路径和。
 * 最后判断 targetSum 是否在数组中。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {TreeNode | null} root
 * @param {number} targetSum
 * @return {boolean}
 */
function hasPathSum1(root, targetSum) {
  const sums = [];

  function dfs(node, sum) {
    if (!node) return;

    const nextSum = sum + node.val;
    if (!node.left && !node.right) {
      sums.push(nextSum);
      return;
    }

    dfs(node.left, nextSum);
    dfs(node.right, nextSum);
  }

  dfs(root, 0);
  return sums.includes(targetSum);
}

/**
 * 第二版 hasPathSum2
 *
 * BFS 队列。
 * 队列里同时保存节点和从根到当前节点的路径和。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {TreeNode | null} root
 * @param {number} targetSum
 * @return {boolean}
 */
function hasPathSum2(root, targetSum) {
  if (!root) return false;

  const queue = [{ node: root, sum: root.val }];
  let head = 0;

  while (head < queue.length) {
    const { node, sum } = queue[head++];

    if (!node.left && !node.right && sum === targetSum) {
      return true;
    }

    if (node.left) queue.push({ node: node.left, sum: sum + node.left.val });
    if (node.right) queue.push({ node: node.right, sum: sum + node.right.val });
  }

  return false;
}

/**
 * 第三版 hasPathSum（面试推荐版）
 *
 * 递归扣减 targetSum。
 * 走到某个节点时，把当前节点值从 targetSum 中减掉。
 * 如果到达叶子节点时剩余值等于叶子值，就说明存在路径。
 *
 * 这版现场最推荐写：
 * 1. 不需要额外数组保存所有路径。
 * 2. 找到一个答案就可以提前返回。
 * 3. 代码能直接体现根到叶路径的定义。
 *
 * 时间复杂度 O(n)，空间复杂度 O(h)。
 * @param {TreeNode | null} root
 * @param {number} targetSum
 * @return {boolean}
 */
function hasPathSum(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) return root.val === targetSum;

  return (
    hasPathSum(root.left, targetSum - root.val) ||
    hasPathSum(root.right, targetSum - root.val)
  );
}

if (typeof module !== "undefined") {
  module.exports = {
    hasPathSum1,
    hasPathSum2,
    hasPathSum,
  };
}
