/**
 * 无重复字符的最长子串
 *
 * Hot100 原题：
 * LeetCode 3. 无重复字符的最长子串
 * https://leetcode.cn/problems/longest-substring-without-repeating-characters/
 *
 * 题目：
 * 给定一个字符串 s，请你找出其中不含有重复字符的最长子串的长度。
 *
 * 关键词是「子串」而不是「子序列」，所以字符必须连续。
 * 面试里的核心是滑动窗口：窗口内始终保持没有重复字符。
 */

/**
 * 第一版 lengthOfLongestSubstring1
 *
 * 暴力枚举每个起点。
 * 从 i 开始向右扩展，用 Set 判断当前子串是否出现重复字符。
 *
 * 这版直观，但每个起点最多向右扫描 O(n)，总时间 O(n^2)。
 *
 * 时间复杂度 O(n^2)，空间复杂度 O(n)。
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring1(s) {
  let max = 0;

  for (let i = 0; i < s.length; i++) {
    const seen = new Set();

    for (let j = i; j < s.length; j++) {
      if (seen.has(s[j])) break;
      seen.add(s[j]);
      max = Math.max(max, j - i + 1);
    }
  }

  return max;
}

/**
 * 第二版 lengthOfLongestSubstring2
 *
 * 滑动窗口 + Set。
 * right 不断向右扩展；如果 s[right] 已经在窗口中，就移动 left，
 * 一边移动一边删除左侧字符，直到窗口重新无重复。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring2(s) {
  const window = new Set();
  let left = 0;
  let max = 0;

  for (let right = 0; right < s.length; right++) {
    while (window.has(s[right])) {
      window.delete(s[left]);
      left++;
    }

    window.add(s[right]);
    max = Math.max(max, right - left + 1);
  }

  return max;
}

/**
 * 第三版 lengthOfLongestSubstring（面试推荐版）
 *
 * 滑动窗口 + Map 记录字符最近一次出现位置。
 * 遍历到 s[right] 时，如果该字符上次出现位置在当前窗口内，
 * left 可以直接跳到上次位置的下一位，而不是一步一步删除。
 *
 * 面试官希望看到的关键点：
 * 1. Map 存的是「字符 -> 最近出现下标」。
 * 2. left 只能向右移动，所以要用 Math.max 避免回退。
 * 3. 每轮都用 right - left + 1 更新答案。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  const lastIndex = new Map();
  let left = 0;
  let max = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    if (lastIndex.has(char)) {
      left = Math.max(left, lastIndex.get(char) + 1);
    }

    lastIndex.set(char, right);
    max = Math.max(max, right - left + 1);
  }

  return max;
}

if (typeof module !== "undefined") {
  module.exports = {
    lengthOfLongestSubstring1,
    lengthOfLongestSubstring2,
    lengthOfLongestSubstring,
  };
}
