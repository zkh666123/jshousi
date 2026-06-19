/**
 * 二叉树的中序遍历
 *
 * Hot100 原题：
 * LeetCode 94. 二叉树的中序遍历
 * https://leetcode.cn/problems/binary-tree-inorder-traversal/
 *
 * 题目：
 * 给定一个二叉树的根节点 root，返回它的中序遍历。
 * 中序遍历顺序是：左子树 -> 根节点 -> 右子树。
 */

/**
 * 第一版 inorderTraversal1
 *
 * 递归遍历。
 * 按「左、根、右」的顺序访问。
 *
 * 时间复杂度 O(n)，空间复杂度 O(h)。
 * @param {TreeNode | null} root
 * @return {number[]}
 */
function inorderTraversal1(root) {
  const result = [];

  function dfs(node) {
    if (!node) return;

    dfs(node.left);
    result.push(node.val);
    dfs(node.right);
  }

  dfs(root);
  return result;
}

/**
 * 第二版 inorderTraversal2
 *
 * 迭代栈。
 * 不断把左链压栈，直到为空，再弹出节点访问，然后转向右子树。
 *
 * 时间复杂度 O(n)，空间复杂度 O(h)。
 * @param {TreeNode | null} root
 * @return {number[]}
 */
function inorderTraversal2(root) {
  const result = [];
  const stack = [];
  let current = root;

  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }

  return result;
}

/**
 * 第三版 inorderTraversal（面试推荐版）
 *
 * Morris 中序遍历。
 * 利用树中空闲的右指针建立临时线索，遍历完成后恢复结构。
 *
 * 这版属于大厂追问深度版本：
 * 1. 时间复杂度仍是 O(n)。
 * 2. 额外空间降到 O(1)。
 * 3. 要强调会恢复临时指针，不破坏原树。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {TreeNode | null} root
 * @return {number[]}
 */
function inorderTraversal(root) {
  const result = [];
  let current = root;

  while (current) {
    if (!current.left) {
      result.push(current.val);
      current = current.right;
    } else {
      let predecessor = current.left;
      while (predecessor.right && predecessor.right !== current) {
        predecessor = predecessor.right;
      }

      if (!predecessor.right) {
        predecessor.right = current;
        current = current.left;
      } else {
        predecessor.right = null;
        result.push(current.val);
        current = current.right;
      }
    }
  }

  return result;
}

if (typeof module !== "undefined") {
  module.exports = {
    inorderTraversal1,
    inorderTraversal2,
    inorderTraversal,
  };
}
