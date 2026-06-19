/**
 * 全排列
 *
 * Hot100 原题：
 * LeetCode 46. 全排列
 * https://leetcode.cn/problems/permutations/
 *
 * 题目：
 * 给定一个不含重复数字的数组 nums，返回其所有可能的全排列。
 *
 * 全排列本质是回溯：
 * 1. 路径 track 表示当前已经选了哪些数。
 * 2. used 表示某个下标是否已经被使用。
 * 3. 当路径长度等于 nums.length 时，得到一个完整排列。
 */

/**
 * 第一版 permute1
 *
 * 暴力递归生成剩余数组。
 * 每次选择一个数字，把它从 rest 中删除，再递归生成后续排列。
 *
 * 写法直观，但每层递归都会 slice/filter 创建新数组。
 *
 * 时间复杂度 O(n * n!)，空间复杂度 O(n * n!)，不计算返回结果时递归栈 O(n)。
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute1(nums) {
  const result = [];

  function dfs(path, rest) {
    if (rest.length === 0) {
      result.push(path);
      return;
    }

    for (let i = 0; i < rest.length; i++) {
      dfs(path.concat(rest[i]), rest.slice(0, i).concat(rest.slice(i + 1)));
    }
  }

  dfs([], nums);
  return result;
}

/**
 * 第二版 permute2
 *
 * 回溯 + used 数组。
 * 不再创建 rest 数组，而是用 used 标记每个下标是否已选。
 *
 * 时间复杂度 O(n * n!)，空间复杂度 O(n)，不计算返回结果。
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute2(nums) {
  const result = [];
  const track = [];
  const used = new Array(nums.length).fill(false);

  function backtrack() {
    if (track.length === nums.length) {
      result.push(track.slice());
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      track.push(nums[i]);
      backtrack();
      track.pop();
      used[i] = false;
    }
  }

  backtrack();
  return result;
}

/**
 * 第三版 permute（面试推荐版）
 *
 * 原地交换回溯。
 * index 表示当前要确定的位置，在 [index, n - 1] 中依次选择一个数交换到 index。
 *
 * 这版适合追问空间优化：
 * 1. 不需要 used 数组。
 * 2. 每层递归只通过交换维护状态。
 * 3. 回溯时再交换回来，保证下一轮选择不受影响。
 *
 * 时间复杂度 O(n * n!)，空间复杂度 O(n)，空间来自递归栈和当前排列拷贝。
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
  const arr = nums.slice();
  const result = [];

  function backtrack(index) {
    if (index === arr.length) {
      result.push(arr.slice());
      return;
    }

    for (let i = index; i < arr.length; i++) {
      [arr[index], arr[i]] = [arr[i], arr[index]];
      backtrack(index + 1);
      [arr[index], arr[i]] = [arr[i], arr[index]];
    }
  }

  backtrack(0);
  return result;
}

if (typeof module !== "undefined") {
  module.exports = {
    permute1,
    permute2,
    permute,
  };
}
