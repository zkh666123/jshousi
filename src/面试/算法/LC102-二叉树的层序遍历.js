/**
 * 二叉树的层序遍历
 *
 * Hot100 原题：
 * LeetCode 102. 二叉树的层序遍历
 * https://leetcode.cn/problems/binary-tree-level-order-traversal/
 *
 * 题目：
 * 给你二叉树的根节点 root，返回其节点值的层序遍历。
 * 也就是逐层地，从左到右访问所有节点。
 */

/**
 * 第一版 levelOrder1
 *
 * DFS 暴力收集层级。
 * 递归时携带 depth，把节点值放到 result[depth] 中。
 *
 * 时间复杂度 O(n)，空间复杂度 O(h)，h 是树高。
 * @param {TreeNode | null} root
 * @return {number[][]}
 */
function levelOrder1(root) {
  const result = [];

  function dfs(node, depth) {
    if (!node) return;
    if (!result[depth]) result[depth] = [];

    result[depth].push(node.val);
    dfs(node.left, depth + 1);
    dfs(node.right, depth + 1);
  }

  dfs(root, 0);
  return result;
}

/**
 * 第二版 levelOrder2
 *
 * BFS 队列 + shift。
 * 队列里保存当前还没访问的节点；每轮处理一整层。
 *
 * 算法复杂度是 O(n)，但 JS 数组 shift 可能带来额外移动成本。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {TreeNode | null} root
 * @return {number[][]}
 */
function levelOrder2(root) {
  if (!root) return [];

  const queue = [root];
  const result = [];

  while (queue.length) {
    const level = [];
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}

/**
 * 第三版 levelOrder（面试推荐版）
 *
 * BFS 队列 + head 指针。
 * 和第二版思路一致，但不用 shift，避免数组头删的隐藏成本。
 *
 * 面试官希望看到的关键点：
 * 1. 每一轮先记录当前 queue 的边界。
 * 2. 只处理这一层已有节点，新入队的节点留给下一层。
 * 3. 使用 head 指针模拟队列出队。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {TreeNode | null} root
 * @return {number[][]}
 */
function levelOrder(root) {
  if (!root) return [];

  const queue = [root];
  const result = [];
  let head = 0;

  while (head < queue.length) {
    const level = [];
    const levelEnd = queue.length;

    for (let i = head; i < levelEnd; i++) {
      const node = queue[i];
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    head = levelEnd;
    result.push(level);
  }

  return result;
}

if (typeof module !== "undefined") {
  module.exports = {
    levelOrder1,
    levelOrder2,
    levelOrder,
  };
}
