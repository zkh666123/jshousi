/**
 * 合并二维有序数组
 *
 * 题目：
 * 给定一个二维数组，每个子数组内部已经升序排列，把所有数字合并成一个升序的一维数组。
 *
 * 示例：
 * 输入：[[1,4,6], [2,6,9], [3,7,13], [1,5,12]]
 * 输出：[1,1,2,3,4,5,6,6,7,9,12,13]
 *
 * 这题不是 LeetCode Hot100 原题，但面试里常用来追问「k 路归并」。
 */

/**
 * 第一版 mergeSortedArrays1
 *
 * 暴力做法：先打平，再直接调用 sort。
 *
 * 设总元素个数为 n。
 * 时间复杂度 O(n log n)，空间复杂度 O(n)。
 * @param {number[][]} arrays
 * @return {number[]}
 */
function mergeSortedArrays1(arrays) {
  if (!Array.isArray(arrays)) return [];

  return arrays.flat().sort((a, b) => a - b);
}

/**
 * 第二版 mergeSortedArrays2
 *
 * 逐个合并两个有序数组。
 * 每次把当前结果和下一个有序数组做双指针合并。
 *
 * 设总元素个数为 n，子数组个数为 k。
 * 时间复杂度最坏 O(nk)，空间复杂度 O(n)。
 * @param {number[][]} arrays
 * @return {number[]}
 */
function mergeSortedArrays2(arrays) {
  if (!Array.isArray(arrays) || arrays.length === 0) return [];

  return arrays.reduce((merged, current) => mergeTwoSortedArrays(merged, current), []);
}

function mergeTwoSortedArrays(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);

  return result;
}

/**
 * 第三版 mergeSortedArrays（面试推荐版）
 *
 * 小顶堆做 k 路归并。
 * 先把每个非空子数组的第一个元素放进堆；
 * 每次弹出当前最小值，再把它所在子数组的下一个元素入堆。
 *
 * 设总元素个数为 n，子数组个数为 k。
 * 时间复杂度 O(n log k)，空间复杂度 O(k)，不计算返回结果。
 * @param {number[][]} arrays
 * @return {number[]}
 */
function mergeSortedArrays(arrays) {
  if (!Array.isArray(arrays) || arrays.length === 0) return [];

  const heap = new MinHeap((a, b) => a.value < b.value);
  const result = [];

  for (let row = 0; row < arrays.length; row++) {
    if (arrays[row].length > 0) {
      heap.push({ value: arrays[row][0], row, col: 0 });
    }
  }

  while (heap.size > 0) {
    const current = heap.pop();
    result.push(current.value);

    const nextCol = current.col + 1;
    if (nextCol < arrays[current.row].length) {
      heap.push({
        value: arrays[current.row][nextCol],
        row: current.row,
        col: nextCol,
      });
    }
  }

  return result;
}

class MinHeap {
  constructor(compare) {
    this.data = [];
    this.compare = compare;
  }

  get size() {
    return this.data.length;
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
      if (!this.compare(this.data[index], this.data[parent])) break;
      this.swap(index, parent);
      index = parent;
    }
  }

  sinkDown(index) {
    while (true) {
      const left = index * 2 + 1;
      const right = index * 2 + 2;
      let smallest = index;

      if (left < this.data.length && this.compare(this.data[left], this.data[smallest])) {
        smallest = left;
      }
      if (right < this.data.length && this.compare(this.data[right], this.data[smallest])) {
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
    mergeSortedArrays1,
    mergeSortedArrays2,
    mergeSortedArrays,
  };
}
