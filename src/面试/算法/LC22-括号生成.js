/**
 * 括号生成
 *
 * Hot100 原题：
 * LeetCode 22. 括号生成
 * https://leetcode.cn/problems/generate-parentheses/
 *
 * 题目：
 * 数字 n 代表生成括号的对数，请你设计一个函数，生成所有可能且有效的括号组合。
 */

/**
 * 第一版 generateParenthesis1
 *
 * 暴力生成所有长度为 2n 的括号字符串，再过滤合法字符串。
 *
 * 时间复杂度 O(2^(2n) * n)，空间复杂度 O(n)。
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis1(n) {
  const result = [];

  function isValid(str) {
    let balance = 0;
    for (const char of str) {
      balance += char === "(" ? 1 : -1;
      if (balance < 0) return false;
    }
    return balance === 0;
  }

  function dfs(path) {
    if (path.length === n * 2) {
      if (isValid(path)) result.push(path);
      return;
    }

    dfs(path + "(");
    dfs(path + ")");
  }

  dfs("");
  return result;
}

/**
 * 第二版 generateParenthesis2
 *
 * 回溯 + 剪枝。
 * 只在括号数量允许时继续递归：
 * 1. left < n 时可以放左括号。
 * 2. right < left 时可以放右括号。
 *
 * 时间复杂度接近 Catalan(n)，空间复杂度 O(n)。
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis2(n) {
  const result = [];

  function backtrack(path, left, right) {
    if (path.length === n * 2) {
      result.push(path);
      return;
    }

    if (left < n) backtrack(path + "(", left + 1, right);
    if (right < left) backtrack(path + ")", left, right + 1);
  }

  backtrack("", 0, 0);
  return result;
}

/**
 * 第三版 generateParenthesis（面试推荐版）
 *
 * 回溯 + path 数组。
 * 和第二版思路一致，但用数组 push/pop 管理路径，减少字符串反复拼接。
 *
 * 面试官希望看到的关键点：
 * 1. 左括号数量不能超过 n。
 * 2. 任意前缀中右括号数量不能超过左括号数量。
 * 3. 长度达到 2n 时就是一个合法答案。
 *
 * 时间复杂度 O(Catalan(n) * n)，空间复杂度 O(n)，不计算返回结果。
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis(n) {
  const result = [];
  const path = [];

  function backtrack(left, right) {
    if (path.length === n * 2) {
      result.push(path.join(""));
      return;
    }

    if (left < n) {
      path.push("(");
      backtrack(left + 1, right);
      path.pop();
    }

    if (right < left) {
      path.push(")");
      backtrack(left, right + 1);
      path.pop();
    }
  }

  backtrack(0, 0);
  return result;
}

if (typeof module !== "undefined") {
  module.exports = {
    generateParenthesis1,
    generateParenthesis2,
    generateParenthesis,
  };
}
