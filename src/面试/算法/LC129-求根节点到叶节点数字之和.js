/**
 * 求根节点到叶节点数字之和
 *
 * LeetCode 原题：
 * LeetCode 129. 求根节点到叶节点数字之和
 * https://leetcode.cn/problems/sum-root-to-leaf-numbers/
 *
 * 题目：
 * 给你一个二叉树的根节点 root，树中每个节点都存放一个 0 到 9 的数字。
 * 每条从根节点到叶子节点的路径都代表一个数字，返回所有根到叶数字之和。
 */

/**
 * 第一版 sumNumbers1
 *
 * 暴力收集路径字符串。
 * 到叶子节点时把路径 join 成数字，再累加。
 *
 * 时间复杂度 O(n * h)，空间复杂度 O(h)。
 * @param {TreeNode | null} root
 * @return {number}
 */
function sumNumbers1(root) {
  let sum = 0;
  const path = [];

  function dfs(node) {
    if (!node) return;

    path.push(node.val);

    if (!node.left && !node.right) {
      sum += Number(path.join(""));
    } else {
      dfs(node.left);
      dfs(node.right);
    }

    path.pop();
  }

  dfs(root);
  return sum;
}

/**
 * 第二版 sumNumbers2
 *
 * DFS 携带当前数字。
 * 每往下一层，当前数字变成 current * 10 + node.val。
 *
 * 时间复杂度 O(n)，空间复杂度 O(h)。
 * @param {TreeNode | null} root
 * @return {number}
 */
function sumNumbers2(root) {
  let sum = 0;

  function dfs(node, current) {
    if (!node) return;

    const next = current * 10 + node.val;
    if (!node.left && !node.right) {
      sum += next;
      return;
    }

    dfs(node.left, next);
    dfs(node.right, next);
  }

  dfs(root, 0);
  return sum;
}

/**
 * 第三版 sumNumbers（面试推荐版）
 *
 * 分治递归返回子树贡献。
 * dfs(node, current) 返回从当前节点继续往下能形成的所有数字之和。
 *
 * 这版不依赖外部变量，递归定义更干净：
 * 1. 空节点贡献 0。
 * 2. 叶子节点贡献当前路径数字。
 * 3. 非叶子节点贡献左右子树之和。
 *
 * 时间复杂度 O(n)，空间复杂度 O(h)。
 * @param {TreeNode | null} root
 * @return {number}
 */
function sumNumbers(root) {
  function dfs(node, current) {
    if (!node) return 0;

    const next = current * 10 + node.val;
    if (!node.left && !node.right) return next;

    return dfs(node.left, next) + dfs(node.right, next);
  }

  return dfs(root, 0);
}

if (typeof module !== "undefined") {
  module.exports = {
    sumNumbers1,
    sumNumbers2,
    sumNumbers,
  };
}
