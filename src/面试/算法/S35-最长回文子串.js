/**
 * 最长回文子串
 *
 * Hot100 原题：
 * LeetCode 5. 最长回文子串
 * https://leetcode.cn/problems/longest-palindromic-substring/
 *
 * 给定一个字符串 s，返回 s 中最长的回文子串。
 * 回文串指正着读和反着读都一样的字符串，例如 "aba"、"abba"。
 * 这里要求的是「子串」，所以必须连续；不能像子序列那样跳过字符。
 *
 * 常见解法：
 * 1. 暴力枚举所有子串，再判断是否回文，时间复杂度 O(n^3)。
 * 2. 动态规划，记录 s[i..j] 是否回文，时间复杂度 O(n^2)，空间复杂度 O(n^2)。
 * 3. 中心扩展法，从每个可能的中心向两边扩展，时间复杂度 O(n^2)，空间复杂度 O(1)。
 *
 * 这里使用中心扩展法。
 * 回文串的中心有两种：
 * 1. 奇数长度：中心是一个字符，例如 "aba" 的中心是 "b"。
 * 2. 偶数长度：中心是两个字符中间的位置，例如 "abba" 的中心是两个 "b"。
 *
 * 所以遍历每个位置 i 时，需要分别尝试：
 * 1. expand(i, i)：以 i 为中心扩展奇数长度回文。
 * 2. expand(i, i + 1)：以 i 和 i + 1 为中心扩展偶数长度回文。
 *
 * 注意点：
 * 1. expand 返回的是扩展结束后的有效左右边界。
 * 2. 当出现同样长度的回文时，这里保留先找到的那个。
 * 3. 空字符串和单字符字符串可以直接返回自身。
 *
 * 时间复杂度 O(n^2)，最坏情况下每个中心都可能扩展到字符串边界。
 * 空间复杂度 O(1)，只维护左右边界。
 */

/**
 * 第一版 longestPalindrome
 *
 * 暴力枚举所有子串，再逐个判断是否是回文串。
 * 这版最容易写出来，但复杂度太高，面试里只能作为思路起点。
 *
 * 时间复杂度 O(n^3)，空间复杂度 O(1)，substring 产生的新字符串不计入时。
 * @param {string} s
 * @return {string}
 */
function longestPalindrome1(s) {
  let result = "";

  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      const sub = s.substring(i, j + 1);
      if (sub.length > result.length && isPalindrome(sub)) {
        result = sub;
      }
    }
  }

  return result;
}

function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }

  return true;
}

/**
 * 第二版 longestPalindrome
 *
 * 动态规划。
 * dp[i][j] 表示 s[i..j] 是否是回文串：
 * 1. s[i] !== s[j]，一定不是回文。
 * 2. s[i] === s[j] 且长度小于等于 3，一定是回文。
 * 3. s[i] === s[j] 且长度大于 3，取决于 dp[i + 1][j - 1]。
 *
 * 时间复杂度 O(n^2)，空间复杂度 O(n^2)。
 * @param {string} s
 * @return {string}
 */
function longestPalindrome2(s) {
  if (s.length < 2) return s;

  const dp = Array.from({ length: s.length }, () => new Array(s.length).fill(false));
  let start = 0;
  let maxLen = 1;

  for (let right = 0; right < s.length; right++) {
    for (let left = 0; left <= right; left++) {
      if (s[left] === s[right] && (right - left <= 2 || dp[left + 1][right - 1])) {
        dp[left][right] = true;
        if (right - left + 1 > maxLen) {
          start = left;
          maxLen = right - left + 1;
        }
      }
    }
  }

  return s.substring(start, start + maxLen);
}

/**
 * 第三版 longestPalindrome（面试推荐版）
 *
 * 中心扩展法。
 * 分别处理奇数长度和偶数长度的回文中心。
 *
 * 这版是现场更推荐写的版本：
 * 1. 比动态规划更省空间。
 * 2. 逻辑比 Manacher 简洁，面试官通常不会要求直接写 Manacher。
 * 3. 要明确奇数中心 expand(i, i) 和偶数中心 expand(i, i + 1) 都要处理。
 *
 * 时间复杂度 O(n^2)，空间复杂度 O(1)。
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
  if (s.length < 2) return s;

  let start = 0;
  let end = 0;

  function expand(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return [left + 1, right - 1];
  }

  for (let i = 0; i < s.length; i++) {
    const odd = expand(i, i);
    const even = expand(i, i + 1);
    const best = odd[1] - odd[0] >= even[1] - even[0] ? odd : even;

    if (best[1] - best[0] > end - start) {
      start = best[0];
      end = best[1];
    }
  }

  return s.substring(start, end + 1);
}

if (typeof module !== "undefined") {
  module.exports = {
    longestPalindrome1,
    longestPalindrome2,
    longestPalindrome,
  };
}
