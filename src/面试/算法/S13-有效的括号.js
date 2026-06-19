/**
 * 有效的括号
 *
 * Hot100 原题：
 * LeetCode 20. 有效的括号
 * https://leetcode.cn/problems/valid-parentheses/
 *
 * 给定一个只包括 "(", ")", "{", "}", "[", "]" 的字符串 s，判断字符串是否有效。
 * 有效字符串需要满足：
 * 1. 左括号必须用相同类型的右括号闭合。
 * 2. 左括号必须以正确的顺序闭合。
 * 3. 每个右括号都有一个对应的相同类型的左括号。
 *
 * 面试里这题的本质是「最近打开的左括号，必须最先被关闭」，所以天然适合用栈。
 */

/**
 * 第一版 isValid1
 *
 * 暴力消除法。
 * 不断删除字符串中的 "()"、"[]"、"{}"，如果最后能删空，说明括号有效。
 *
 * 这版非常直观，适合理解「成对抵消」的题意，但每轮 replace 都要扫描字符串，
 * 最坏情况下会退化到 O(n^2)，面试不能停在这里。
 *
 * 时间复杂度 O(n^2)，空间复杂度 O(n)。
 * @param {string} s
 * @return {boolean}
 */
function isValid1(s) {
  let current = s;

  while (
    current.includes("()") ||
    current.includes("[]") ||
    current.includes("{}")
  ) {
    current = current.replace("()", "").replace("[]", "").replace("{}", "");
  }

  return current.length === 0;
}

/**
 * 第二版 isValid2
 *
 * 栈 + 分支判断。
 * 遇到左括号入栈；遇到右括号时弹出栈顶，检查两者是否匹配。
 *
 * 这版已经是 O(n)，只是匹配逻辑写在多个条件分支里，括号类型变多时不够好维护。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {string} s
 * @return {boolean}
 */
function isValid2(s) {
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
      continue;
    }

    const top = stack.pop();
    if (
      (char === ")" && top !== "(") ||
      (char === "]" && top !== "[") ||
      (char === "}" && top !== "{")
    ) {
      return false;
    }
  }

  return stack.length === 0;
}

/**
 * 第三版 isValid（面试推荐版）
 *
 * 栈 + Map。
 * 用 Map 保存「右括号 -> 左括号」的对应关系，让匹配逻辑更集中。
 *
 * 这版现场最推荐写：
 * 1. 长度为奇数时可以直接返回 false。
 * 2. 栈只保存左括号。
 * 3. 遇到右括号时，只比较栈顶是否是它需要的左括号。
 * 4. 最后栈必须为空，避免只出现左括号的情况。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  if (s.length % 2 === 1) return false;

  const stack = [];
  const pairs = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);

  for (const char of s) {
    if (!pairs.has(char)) {
      stack.push(char);
      continue;
    }

    if (stack.pop() !== pairs.get(char)) {
      return false;
    }
  }

  return stack.length === 0;
}

if (typeof module !== "undefined") {
  module.exports = {
    isValid1,
    isValid2,
    isValid,
  };
}
