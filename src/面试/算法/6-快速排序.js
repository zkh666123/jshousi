/**
 * 快速排序 Quick Sort
 *
 * 来源：
 * 补充题 4. 手撕快速排序
 *
 * 题目：
 * 给定一个整数数组 nums，请将它按升序排序。
 *
 * 快速排序的核心是分治：
 * 1. 选一个基准值 pivot。
 * 2. 通过 partition 把数组分成「小于 pivot」和「大于 pivot」两侧。
 * 3. 递归处理左右两侧。
 *
 * 面试里这题不是只会背 O(n log n)，而是要能说清楚：
 * 1. 基准选得不好时，已经有序数组会退化成 O(n^2)。
 * 2. 随机化 pivot 可以降低退化概率。
 * 3. 重复元素很多时，三路快排能明显减少无意义递归。
 *
 * 稳定性：不稳定。
 * 平均时间复杂度：O(n log n)。
 * 最坏时间复杂度：O(n^2)。
 */

/**
 * 第一版 quickSort1
 *
 * 暴力易懂版，非原地排序。
 * 每次取第一个元素作为 pivot，把剩余元素拆成 left/right 两个新数组后递归。
 *
 * 这版适合理解分治，但有两个明显问题：
 * 1. 每层递归都会创建新数组，空间开销高。
 * 2. pivot 固定取第一个，遇到接近有序数组容易退化。
 *
 * 平均时间复杂度 O(n log n)，最坏 O(n^2)，空间复杂度 O(n)。
 * @param {number[]} nums
 * @return {number[]}
 */
function quickSort1(nums) {
  if (nums.length <= 1) return nums.slice();

  const pivot = nums[0];
  const left = [];
  const right = [];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= pivot) {
      left.push(nums[i]);
    } else {
      right.push(nums[i]);
    }
  }

  return quickSort1(left).concat(pivot, quickSort1(right));
}

/**
 * 第二版 quickSort2
 *
 * 原地 Lomuto partition + 随机 pivot。
 * 随机选一个基准值并交换到 right 位置，然后把小于等于 pivot 的元素放到左侧。
 *
 * 这版已经是常见面试写法：
 * 1. 不额外创建左右数组。
 * 2. 随机 pivot 降低最坏情况出现概率。
 * 3. 返回原数组本身，符合排序函数常见习惯。
 *
 * 平均时间复杂度 O(n log n)，最坏 O(n^2)，空间复杂度 O(log n)。
 * @param {number[]} nums
 * @return {number[]}
 */
function quickSort2(nums) {
  function partition(left, right) {
    const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
    [nums[randomIndex], nums[right]] = [nums[right], nums[randomIndex]];

    const pivot = nums[right];
    let storeIndex = left;

    for (let i = left; i < right; i++) {
      if (nums[i] <= pivot) {
        [nums[i], nums[storeIndex]] = [nums[storeIndex], nums[i]];
        storeIndex++;
      }
    }

    [nums[storeIndex], nums[right]] = [nums[right], nums[storeIndex]];
    return storeIndex;
  }

  function sort(left, right) {
    if (left >= right) return;

    const pivotIndex = partition(left, right);
    sort(left, pivotIndex - 1);
    sort(pivotIndex + 1, right);
  }

  sort(0, nums.length - 1);
  return nums;
}

/**
 * 第三版 quickSort（面试推荐版）
 *
 * 三路快速排序。
 * 每轮 partition 把数组切成三段：
 * 1. [left, lt - 1] 小于 pivot。
 * 2. [lt, gt] 等于 pivot。
 * 3. [gt + 1, right] 大于 pivot。
 *
 * 这版更适合大厂面试追问：
 * 1. 重复元素多时，不会把等于 pivot 的元素反复递归。
 * 2. 随机 pivot 保留平均 O(n log n) 的稳定表现。
 * 3. 原地排序，额外空间主要来自递归栈。
 *
 * 平均时间复杂度 O(n log n)，重复元素很多时更接近 O(n) 分区成本。
 * 最坏时间复杂度 O(n^2)，空间复杂度 O(log n)。
 * @param {number[]} nums
 * @return {number[]}
 */
function quickSort(nums) {
  function sort(left, right) {
    if (left >= right) return;

    const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
    [nums[left], nums[randomIndex]] = [nums[randomIndex], nums[left]];

    const pivot = nums[left];
    let lt = left;
    let i = left + 1;
    let gt = right;

    while (i <= gt) {
      if (nums[i] < pivot) {
        [nums[lt], nums[i]] = [nums[i], nums[lt]];
        lt++;
        i++;
      } else if (nums[i] > pivot) {
        [nums[i], nums[gt]] = [nums[gt], nums[i]];
        gt--;
      } else {
        i++;
      }
    }

    sort(left, lt - 1);
    sort(gt + 1, right);
  }

  sort(0, nums.length - 1);
  return nums;
}

if (typeof module !== "undefined") {
  module.exports = {
    quickSort1,
    quickSort2,
    quickSort,
  };
}
