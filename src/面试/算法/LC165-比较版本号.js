/**
 * 比较版本号
 *
 * LeetCode 原题：
 * LeetCode 165. 比较版本号
 * https://leetcode.cn/problems/compare-version-numbers/
 *
 * 题目：
 * 给你两个版本号 version1 和 version2，请比较它们。
 * 版本号由一个或多个修订号组成，各修订号由 "." 连接。
 * 每个修订号按整数比较，忽略前导零；缺失修订号按 0 处理。
 */

/**
 * 第一版 compareVersion1
 *
 * split 后转数字数组，再按最大长度逐段比较。
 *
 * 时间复杂度 O(n + m)，空间复杂度 O(n + m)。
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
function compareVersion1(version1, version2) {
  const parts1 = version1.split(".").map(Number);
  const parts2 = version2.split(".").map(Number);
  const maxLength = Math.max(parts1.length, parts2.length);

  for (let i = 0; i < maxLength; i++) {
    const num1 = parts1[i] || 0;
    const num2 = parts2[i] || 0;

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  return 0;
}

/**
 * 第二版 compareVersion2
 *
 * 双指针扫描。
 * 不提前切分数组，而是边扫描边解析当前修订号。
 *
 * 时间复杂度 O(n + m)，空间复杂度 O(1)。
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
function compareVersion2(version1, version2) {
  let i = 0;
  let j = 0;

  while (i < version1.length || j < version2.length) {
    let num1 = 0;
    let num2 = 0;

    while (i < version1.length && version1[i] !== ".") {
      num1 = num1 * 10 + Number(version1[i]);
      i++;
    }
    while (j < version2.length && version2[j] !== ".") {
      num2 = num2 * 10 + Number(version2[j]);
      j++;
    }

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;

    i++;
    j++;
  }

  return 0;
}

/**
 * 第三版 compareVersion（面试推荐版）
 *
 * 双指针扫描。
 * 不提前 split 出数组，而是边扫描边解析当前修订号。
 *
 * 这版更适合大厂追问复杂度：
 * 1. 只遍历两个字符串一次。
 * 2. 不额外创建修订号数组。
 * 3. 数字解析时自然忽略前导零。
 *
 * 时间复杂度 O(n + m)，空间复杂度 O(1)。
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
function compareVersion(version1, version2) {
  let i = 0;
  let j = 0;

  while (i < version1.length || j < version2.length) {
    let num1 = 0;
    let num2 = 0;

    while (i < version1.length && version1[i] !== ".") {
      num1 = num1 * 10 + Number(version1[i]);
      i++;
    }
    while (j < version2.length && version2[j] !== ".") {
      num2 = num2 * 10 + Number(version2[j]);
      j++;
    }

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;

    i++;
    j++;
  }

  return 0;
}

if (typeof module !== "undefined") {
  module.exports = {
    compareVersion1,
    compareVersion2,
    compareVersion,
  };
}
