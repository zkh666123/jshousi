/**
 * 复原 IP 地址
 *
 * LeetCode 原题：
 * LeetCode 93. 复原 IP 地址
 * https://leetcode.cn/problems/restore-ip-addresses/
 *
 * 题目：
 * 给定一个只包含数字的字符串 s，用以表示一个 IP 地址，
 * 返回所有可能的有效 IP 地址。
 *
 * 有效 IP 地址由四个整数段组成，每段范围是 0 到 255。
 * 除了数字 0 本身，每段不能有前导零。
 */

/**
 * 第一版 restoreIpAddresses1
 *
 * 三重循环枚举三个切分点。
 * 把字符串切成四段后逐段判断是否合法。
 *
 * 时间复杂度 O(1)，因为每段最多 3 位，循环规模受 IP 规则限制；按写法可理解为 O(n^3)。
 * 空间复杂度 O(1)，不计算返回结果。
 * @param {string} s
 * @return {string[]}
 */
function restoreIpAddresses1(s) {
  const result = [];

  for (let i = 1; i <= 3; i++) {
    for (let j = i + 1; j <= i + 3; j++) {
      for (let k = j + 1; k <= j + 3; k++) {
        const parts = [
          s.slice(0, i),
          s.slice(i, j),
          s.slice(j, k),
          s.slice(k),
        ];

        if (parts.every(isValidIpPart)) {
          result.push(parts.join("."));
        }
      }
    }
  }

  return result;
}

function isValidIpPart(part) {
  if (part.length < 1 || part.length > 3) return false;
  if (part.length > 1 && part[0] === "0") return false;
  return Number(part) <= 255;
}

/**
 * 第二版 restoreIpAddresses2
 *
 * 回溯枚举每一段。
 * 每层选择长度为 1、2、3 的片段，合法就进入下一层。
 *
 * 时间复杂度 O(1)，空间复杂度 O(1)，不计算返回结果。
 * @param {string} s
 * @return {string[]}
 */
function restoreIpAddresses2(s) {
  const result = [];
  const path = [];

  function backtrack(start) {
    if (path.length === 4) {
      if (start === s.length) result.push(path.join("."));
      return;
    }

    for (let len = 1; len <= 3; len++) {
      const part = s.slice(start, start + len);
      if (!isValidIpPart(part)) continue;

      path.push(part);
      backtrack(start + len);
      path.pop();
    }
  }

  backtrack(0);
  return result;
}

/**
 * 第三版 restoreIpAddresses（面试推荐版）
 *
 * 回溯 + 剩余长度剪枝。
 * 在普通回溯基础上，提前判断剩余字符数是否能填满剩余 IP 段。
 *
 * 面试官希望看到的关键点：
 * 1. 一共必须切成 4 段。
 * 2. 每段长度只能是 1 到 3。
 * 3. 前导零非法，数值必须小于等于 255。
 * 4. 剩余字符过多或过少时提前剪枝。
 *
 * 时间复杂度 O(1)，空间复杂度 O(1)，不计算返回结果。
 * @param {string} s
 * @return {string[]}
 */
function restoreIpAddresses(s) {
  const result = [];
  const path = [];

  function backtrack(start) {
    const restParts = 4 - path.length;
    const restChars = s.length - start;

    if (restChars < restParts || restChars > restParts * 3) return;

    if (path.length === 4) {
      if (start === s.length) result.push(path.join("."));
      return;
    }

    for (let len = 1; len <= 3; len++) {
      const part = s.slice(start, start + len);
      if (!isValidIpPart(part)) continue;

      path.push(part);
      backtrack(start + len);
      path.pop();
    }
  }

  backtrack(0);
  return result;
}

if (typeof module !== "undefined") {
  module.exports = {
    restoreIpAddresses1,
    restoreIpAddresses2,
    restoreIpAddresses,
  };
}
