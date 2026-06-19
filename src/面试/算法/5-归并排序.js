/**
 * 归并排序 Merge Sort
 *
 * 题目：
 * 给定一个整数数组 nums，请将它按升序排序。
 *
 * 归并排序也是分治思想：
 * 1. 分：把数组不断二分，直到每个子数组长度为 0 或 1。
 * 2. 治：两个有序数组用双指针合并成一个更大的有序数组。
 * 3. 合：递归向上合并，最终得到完整有序数组。
 *
 * 面试里要能说清楚归并排序和快排的差异：
 * 1. 归并排序最坏时间复杂度也是 O(n log n)，更稳定。
 * 2. 归并排序需要 O(n) 额外空间，不是原地排序。
 * 3. 归并排序稳定，适合链表排序、外部排序等场景。
 */

/**
 * 第一版 mergeSort1
 *
 * 暴力版，直接使用内置 sort。
 * 这版不是真正手写归并，只作为复杂度和面试追问起点。
 *
 * 时间复杂度通常 O(n log n)，空间复杂度取决于引擎实现。
 * @param {number[]} nums
 * @return {number[]}
 */
function mergeSort1(nums) {
  return nums.slice().sort((a, b) => a - b);
}

/**
 * 第二版 mergeSort2
 *
 * 自顶向下递归归并。
 * 使用 slice 拆分数组，写法非常直观，但每层递归会创建多个新数组。
 *
 * 时间复杂度 O(n log n)，空间复杂度 O(n log n) 级别的临时切片开销。
 * @param {number[]} nums
 * @return {number[]}
 */
function mergeSort2(nums) {
  if (nums.length <= 1) return nums.slice();

  const mid = Math.floor(nums.length / 2);
  const left = mergeSort2(nums.slice(0, mid));
  const right = mergeSort2(nums.slice(mid));

  return mergeTwoSortedArrays(left, right);
}

function mergeTwoSortedArrays(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);

  return result;
}

/**
 * 第三版 mergeSort（面试推荐版）
 *
 * 自顶向下归并 + 复用辅助数组。
 * 不在递归中频繁 slice，而是在原数组和辅助数组之间按下标合并。
 *
 * 这版适合面试现场写到“够深”：
 * 1. 归并逻辑明确，稳定性来自 left <= right 时优先取左侧。
 * 2. 只申请一次 O(n) 辅助数组。
 * 3. 最坏、平均、最好时间复杂度都是 O(n log n)。
 *
 * 时间复杂度 O(n log n)，空间复杂度 O(n)。
 * @param {number[]} nums
 * @return {number[]}
 */
function mergeSort(nums) {
  const arr = nums.slice();
  const temp = new Array(arr.length);

  function sort(left, right) {
    if (left >= right) return;

    const mid = left + Math.floor((right - left) / 2);
    sort(left, mid);
    sort(mid + 1, right);
    merge(left, mid, right);
  }

  function merge(left, mid, right) {
    for (let i = left; i <= right; i++) {
      temp[i] = arr[i];
    }

    let i = left;
    let j = mid + 1;

    for (let k = left; k <= right; k++) {
      if (i > mid) {
        arr[k] = temp[j++];
      } else if (j > right) {
        arr[k] = temp[i++];
      } else if (temp[i] <= temp[j]) {
        arr[k] = temp[i++];
      } else {
        arr[k] = temp[j++];
      }
    }
  }

  sort(0, arr.length - 1);
  return arr;
}

if (typeof module !== "undefined") {
  module.exports = {
    mergeSort1,
    mergeSort2,
    mergeSort,
  };
}
