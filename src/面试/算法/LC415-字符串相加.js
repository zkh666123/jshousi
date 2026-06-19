/**
 * 字符串相加
 *
 * LeetCode 原题：
 * LeetCode 415. 字符串相加
 * https://leetcode.cn/problems/add-strings/
 *
 * 题目：
 * 给定两个字符串形式的非负整数 num1 和 num2，计算它们的和并以字符串形式返回。
 * 不能使用任何内建的大整数库，也不能直接将输入转换为整数。
 */

/**
 * 第一版 addStrings1
 *
 * 直接转 Number 相加。
 * 这版只适用于小整数，用来说明为什么题目禁止直接转换。
 *
 * 时间复杂度 O(1)，但大数会丢精度，不是正确通解。
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function addStrings1(num1, num2) {
  return String(Number(num1) + Number(num2));
}

/**
 * 第二版 addStrings2
 *
 * 补齐长度后从右往左逐位相加。
 * 先用 padStart 把两个字符串补成一样长，再模拟竖式加法。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function addStrings2(num1, num2) {
  const maxLength = Math.max(num1.length, num2.length);
  const a = num1.padStart(maxLength, "0");
  const b = num2.padStart(maxLength, "0");
  const result = [];
  let carry = 0;

  for (let i = maxLength - 1; i >= 0; i--) {
    const sum = Number(a[i]) + Number(b[i]) + carry;
    result.unshift(sum % 10);
    carry = Math.floor(sum / 10);
  }

  if (carry) result.unshift(carry);
  return result.join("");
}

/**
 * 第三版 addStrings（面试推荐版）
 *
 * 双指针模拟竖式加法。
 * 不需要先补齐字符串，只要 i/j 从末尾向前走，越界时按 0 处理。
 *
 * 面试官希望看到的关键点：
 * 1. 从个位开始加。
 * 2. carry 保存进位。
 * 3. 循环条件包含 carry，最后一位进位不能丢。
 *
 * 时间复杂度 O(max(n, m))，空间复杂度 O(max(n, m))。
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function addStrings(num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let carry = 0;
  let result = "";

  while (i >= 0 || j >= 0 || carry) {
    const x = i >= 0 ? num1.charCodeAt(i) - 48 : 0;
    const y = j >= 0 ? num2.charCodeAt(j) - 48 : 0;
    const sum = x + y + carry;

    result = String(sum % 10) + result;
    carry = Math.floor(sum / 10);
    i--;
    j--;
  }

  return result;
}

if (typeof module !== "undefined") {
  module.exports = {
    addStrings1,
    addStrings2,
    addStrings,
  };
}
