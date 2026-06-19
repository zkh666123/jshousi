/**
 * 字符串相乘
 *
 * LeetCode 原题：
 * LeetCode 43. 字符串相乘
 * https://leetcode.cn/problems/multiply-strings/
 *
 * 题目：
 * 给定两个以字符串形式表示的非负整数 num1 和 num2，返回它们的乘积，也用字符串表示。
 * 不能使用任何内建的大整数库，也不能直接将输入转换为整数。
 */

/**
 * 第一版 multiply1
 *
 * 直接转 Number 相乘。
 * 这版只用于说明为什么题目要求手写模拟，大数会丢精度。
 *
 * 时间复杂度 O(1)，但不是正确通解。
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function multiply1(num1, num2) {
  return String(Number(num1) * Number(num2));
}

/**
 * 第二版 multiply2
 *
 * 逐位乘法 + 字符串加法。
 * 对 num2 的每一位，计算它乘以 num1 的部分积，再把所有部分积相加。
 *
 * 时间复杂度 O(mn + n * L)，空间复杂度 O(m + n)。
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function multiply2(num1, num2) {
  if (num1 === "0" || num2 === "0") return "0";

  let result = "0";

  for (let i = num2.length - 1; i >= 0; i--) {
    let carry = 0;
    let current = "";
    const digit2 = Number(num2[i]);

    for (let zero = 0; zero < num2.length - 1 - i; zero++) {
      current += "0";
    }

    for (let j = num1.length - 1; j >= 0 || carry; j--) {
      const digit1 = j >= 0 ? Number(num1[j]) : 0;
      const product = digit1 * digit2 + carry;
      current = String(product % 10) + current;
      carry = Math.floor(product / 10);
    }

    result = addStringsForMultiply(result, current);
  }

  return result;
}

function addStringsForMultiply(num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let carry = 0;
  let result = "";

  while (i >= 0 || j >= 0 || carry) {
    const x = i >= 0 ? Number(num1[i--]) : 0;
    const y = j >= 0 ? Number(num2[j--]) : 0;
    const sum = x + y + carry;
    result = String(sum % 10) + result;
    carry = Math.floor(sum / 10);
  }

  return result;
}

/**
 * 第三版 multiply（面试推荐版）
 *
 * 竖式乘法 + 数组存位。
 * 两个长度分别为 m、n 的数字相乘，结果长度最多为 m + n。
 * num1[i] * num2[j] 的结果会影响 result[i + j] 和 result[i + j + 1]。
 *
 * 面试官希望看到的关键点：
 * 1. 从低位到高位相乘。
 * 2. i + j + 1 存个位，i + j 存进位。
 * 3. 最后去掉前导零。
 *
 * 时间复杂度 O(mn)，空间复杂度 O(m + n)。
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function multiply(num1, num2) {
  if (num1 === "0" || num2 === "0") return "0";

  const result = new Array(num1.length + num2.length).fill(0);

  for (let i = num1.length - 1; i >= 0; i--) {
    for (let j = num2.length - 1; j >= 0; j--) {
      const product = Number(num1[i]) * Number(num2[j]);
      const sum = product + result[i + j + 1];

      result[i + j + 1] = sum % 10;
      result[i + j] += Math.floor(sum / 10);
    }
  }

  while (result[0] === 0) {
    result.shift();
  }

  return result.join("");
}

if (typeof module !== "undefined") {
  module.exports = {
    multiply1,
    multiply2,
    multiply,
  };
}
