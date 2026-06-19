/**
 * 数组中的第 K 个最大元素
 *
 * Hot100 原题：
 * LeetCode 215. 数组中的第 K 个最大元素
 * https://leetcode.cn/problems/kth-largest-element-in-an-array/
 *
 * 题目：
 * 给定整数数组 nums 和整数 k，返回数组中第 k 个最大的元素。
 * 注意是排序后的第 k 个最大元素，不是第 k 个不同的元素。
 *
 * 这题常见三种思路：
 * 1. 直接排序，最简单。
 * 2. 大小为 k 的小顶堆，适合 Top K 和数据流追问。
 * 3. 快速选择，平均 O(n)，是这道题面试里最常写的复杂度版本。
 */

/**
 * 第一版 findKthLargest1
 *
 * 暴力排序。
 * 升序排序后，第 k 个最大元素位于 nums.length - k。
 *
 * 时间复杂度 O(n log n)，空间复杂度取决于排序实现。
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest1(nums, k) {
  return nums.slice().sort((a, b) => a - b)[nums.length - k];
}

/**
 * 第二版 findKthLargest2
 *
 * 维护一个大小为 k 的小顶堆。
 * 堆里始终保存当前见过的 k 个最大元素，堆顶是这 k 个数里最小的那个。
 * 遍历结束后，堆顶就是整个数组的第 k 大元素。
 *
 * 时间复杂度 O(n log k)，空间复杂度 O(k)。
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest2(nums, k) {
  const minHeap = new MinHeap();

  for (const num of nums) {
    minHeap.push(num);
    if (minHeap.size > k) {
      minHeap.pop();
    }
  }

  return minHeap.peek();
}

/**
 * 第三版 findKthLargest（面试推荐版）
 *
 * 快速选择。
 * 第 k 大元素在升序数组里的下标是 nums.length - k。
 * 基于快排 partition，每次只进入包含目标下标的一侧，不需要完整排序。
 *
 * 面试官会满意的点：
 * 1. 随机 pivot 降低退化概率。
 * 2. 每轮 partition 后只保留一侧继续查找。
 * 3. 平均时间复杂度 O(n)，比完整排序更贴合题目。
 *
 * 平均时间复杂度 O(n)，最坏 O(n^2)，空间复杂度 O(1)。
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest(nums, k) {
  const arr = nums.slice();
  const targetIndex = arr.length - k;
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const pivotIndex = partition(arr, left, right);

    if (pivotIndex === targetIndex) return arr[pivotIndex];
    if (pivotIndex < targetIndex) {
      left = pivotIndex + 1;
    } else {
      right = pivotIndex - 1;
    }
  }

  return -1;
}

function partition(arr, left, right) {
  const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
  [arr[randomIndex], arr[right]] = [arr[right], arr[randomIndex]];

  const pivot = arr[right];
  let storeIndex = left;

  for (let i = left; i < right; i++) {
    if (arr[i] <= pivot) {
      [arr[i], arr[storeIndex]] = [arr[storeIndex], arr[i]];
      storeIndex++;
    }
  }

  [arr[storeIndex], arr[right]] = [arr[right], arr[storeIndex]];
  return storeIndex;
}

class MinHeap {
  constructor() {
    this.data = [];
  }

  get size() {
    return this.data.length;
  }

  peek() {
    return this.data[0];
  }

  push(value) {
    this.data.push(value);
    this.shiftUp(this.data.length - 1);
  }

  pop() {
    if (this.data.length === 0) return undefined;
    if (this.data.length === 1) return this.data.pop();

    const top = this.data[0];
    this.data[0] = this.data.pop();
    this.sinkDown(0);
    return top;
  }

  shiftUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.data[parent] <= this.data[index]) break;
      this.swap(parent, index);
      index = parent;
    }
  }

  sinkDown(index) {
    while (true) {
      const left = index * 2 + 1;
      const right = index * 2 + 2;
      let smallest = index;

      if (left < this.data.length && this.data[left] < this.data[smallest]) {
        smallest = left;
      }
      if (right < this.data.length && this.data[right] < this.data[smallest]) {
        smallest = right;
      }
      if (smallest === index) break;

      this.swap(index, smallest);
      index = smallest;
    }
  }

  swap(i, j) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }
}

if (typeof module !== "undefined") {
  module.exports = {
    findKthLargest1,
    findKthLargest2,
    findKthLargest,
    MinHeap,
  };
}
