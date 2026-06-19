/**
 * 洗牌算法
 *
 * 题目：
 * 给定一个数组，返回一个随机打乱顺序后的数组。
 *
 * 不推荐写法：
 * arr.sort(() => Math.random() - 0.5)
 *
 * 这个写法看起来短，但排序算法的比较过程不是为随机洗牌设计的，
 * 不同排列出现的概率可能不均匀，也会受引擎排序实现影响。
 *
 * 面试里推荐写 Fisher-Yates 洗牌算法。
 */

/**
 * 第一版 shuffle1
 *
 * 暴力抽牌法。
 * 每次从剩余数组里随机抽一个元素，放到结果数组中，直到抽完。
 *
 * 思路很像从牌堆里随机抽牌，容易理解，但 splice 会移动数组元素。
 *
 * 时间复杂度 O(n^2)，空间复杂度 O(n)。
 * @param {any[]} arr
 * @return {any[]}
 */
function shuffle1(arr) {
  const rest = arr.slice();
  const result = [];

  while (rest.length) {
    const index = Math.floor(Math.random() * rest.length);
    result.push(rest.splice(index, 1)[0]);
  }

  return result;
}

/**
 * 第二版 shuffle2
 *
 * 非原地 Fisher-Yates。
 * 先复制一份数组，再在副本上做原地交换，最后返回副本。
 *
 * 适合不希望修改原数组的场景。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {any[]} arr
 * @return {any[]}
 */
function shuffle2(arr) {
  const result = arr.slice();

  for (let i = result.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
  }

  return result;
}

/**
 * 第三版 shuffle（面试推荐版）
 *
 * 原地 Fisher-Yates。
 * 从后往前遍历，第 i 轮在 [0, i] 中随机选一个下标，把它和 i 交换。
 *
 * 为什么是等概率：
 * 每个元素在第 i 轮都有 1 / (i + 1) 的概率被放到位置 i；
 * 固定一个位置后，剩余位置继续在剩余元素中等概率选择。
 *
 * 这版现场最推荐写：
 * 1. 时间复杂度线性。
 * 2. 只用常数额外空间。
 * 3. 每种排列出现的概率一致。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {any[]} arr
 * @return {any[]}
 */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }

  return arr;
}

if (typeof module !== "undefined") {
  module.exports = {
    shuffle1,
    shuffle2,
    shuffle,
  };
}
