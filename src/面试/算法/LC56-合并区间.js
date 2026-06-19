/**
 * 合并区间
 *
 * Hot100 原题：
 * LeetCode 56. 合并区间
 * https://leetcode.cn/problems/merge-intervals/
 *
 * 题目：
 * 给出一个区间集合，请合并所有重叠的区间。
 */

/**
 * 第一版 mergeIntervals1
 *
 * 暴力反复合并。
 * 每轮找任意两个能重叠的区间并合并，直到没有可合并区间。
 *
 * 时间复杂度最坏 O(n^3)，空间复杂度 O(n)。
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function mergeIntervals1(intervals) {
  const arr = intervals.map((item) => item.slice());
  let changed = true;

  while (changed) {
    changed = false;

    for (let i = 0; i < arr.length && !changed; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (isOverlap(arr[i], arr[j])) {
          arr[i] = [
            Math.min(arr[i][0], arr[j][0]),
            Math.max(arr[i][1], arr[j][1]),
          ];
          arr.splice(j, 1);
          changed = true;
          break;
        }
      }
    }
  }

  return arr;
}

function isOverlap(a, b) {
  return a[0] <= b[1] && b[0] <= a[1];
}

/**
 * 第二版 mergeIntervals2
 *
 * 排序 + 栈。
 * 按区间左端点排序，依次把区间和栈顶比较。
 *
 * 时间复杂度 O(n log n)，空间复杂度 O(n)。
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function mergeIntervals2(intervals) {
  if (intervals.length <= 1) return intervals.map((item) => item.slice());

  const arr = intervals.map((item) => item.slice()).sort((a, b) => a[0] - b[0]);
  const stack = [];

  for (const interval of arr) {
    const last = stack[stack.length - 1];
    if (!last || last[1] < interval[0]) {
      stack.push(interval);
    } else {
      last[1] = Math.max(last[1], interval[1]);
    }
  }

  return stack;
}

/**
 * 第三版 mergeIntervals（面试推荐版）
 *
 * 排序 + 结果数组原地扩展。
 * 排序后，能合并的区间一定和当前结果的最后一个区间重叠。
 *
 * 面试官希望看到的关键点：
 * 1. 先按 start 升序排序。
 * 2. 如果当前 start 大于上一个 end，说明没有重叠，直接加入结果。
 * 3. 否则更新上一个 end 为两者较大值。
 *
 * 时间复杂度 O(n log n)，空间复杂度 O(n)。
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals.map((item) => item.slice());

  const arr = intervals.map((item) => item.slice()).sort((a, b) => a[0] - b[0]);
  const result = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    const last = result[result.length - 1];
    const current = arr[i];

    if (current[0] > last[1]) {
      result.push(current);
    } else {
      last[1] = Math.max(last[1], current[1]);
    }
  }

  return result;
}

if (typeof module !== "undefined") {
  module.exports = {
    mergeIntervals1,
    mergeIntervals2,
    mergeIntervals,
  };
}
