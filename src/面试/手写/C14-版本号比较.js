/**
 * 版本号比较与排序
 *
 * 常见题目：
 * 给定两个版本号 version1 和 version2，比较它们的大小。
 *
 * 简化规则：
 * 1. 版本号按 "." 拆分。
 * 2. 每一段按数字比较。
 * 3. 缺失段按 0 处理，所以 "1.0" 等于 "1.0.0"。
 *
 * 注意：
 * 完整 SemVer 还涉及 alpha/beta/rc/build metadata 等规则。
 * 面试里的基础版本号比较通常先按数字段处理，预发布标识可以作为扩展追问。
 */

/**
 * 第一版 compareVersion1
 *
 * 暴力版。
 * 拆分后转数字，再按最大长度逐段比较。
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
 * 双指针扫描版。
 * 不提前 split 出数组，而是边扫描边解析当前数字段。
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
 * split + 逐段 Number 比较。
 *
 * 这版现场更推荐：
 * 1. 逻辑短，容易写对。
 * 2. 缺失段补 0，覆盖 "1.0" 和 "1.0.0"。
 * 3. 返回 1、-1、0，和力扣类版本比较题一致。
 *
 * 时间复杂度 O(n + m)，空间复杂度 O(n + m)。
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
function compareVersion(version1, version2) {
  const parts1 = version1.split(".");
  const parts2 = version2.split(".");
  const maxLength = Math.max(parts1.length, parts2.length);

  for (let i = 0; i < maxLength; i++) {
    const num1 = Number(parts1[i] || 0);
    const num2 = Number(parts2[i] || 0);

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  return 0;
}

/**
 * 按版本号升序排序。
 * @param {string[]} versions
 * @return {string[]}
 */
function sortVersion(versions) {
  return versions.slice().sort(compareVersion);
}

if (typeof module !== "undefined") {
  module.exports = {
    compareVersion1,
    compareVersion2,
    compareVersion,
    sortVersion,
  };
}
