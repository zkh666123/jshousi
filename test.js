const assert = require("assert");

const {
  rightSideView,
  invertTree,
  findMaxTreeNode,
} = require("./src/面试/算法/S21-二叉树的遍历模板.js");

const {
  ListNode,
  createLinkedList,
  linkedListToArray,
  mergeTwoLists,
  reverseList,
  reverseKGroup,
  middleNode,
  hasCycle,
  detectCycle,
} = require("./src/面试/算法/S31-链表合并翻转K个一组中点.js");

const {
  formatCountdown,
  normalizeSeconds,
} = require("./src/面试/手写/C21-倒计时组件-实现定时器.js");

const {
  runTrafficLight,
  trafficLight,
} = require("./src/面试/手写/C24-Promise红绿灯.js");

function requireIfExists(path) {
  try {
    return require(path);
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND" && error.message.includes(path)) {
      return {};
    }
    throw error;
  }
}

const { twoSum, threeSum } = requireIfExists(
  "./src/面试/算法/S32-两数之和与三数之和.js"
);
const { maxSubArray } = requireIfExists("./src/面试/算法/S33-最大子数组和.js");
const { maxSlidingWindow } = requireIfExists(
  "./src/面试/算法/S34-滑动窗口最大值.js"
);
const { longestPalindrome } = requireIfExists(
  "./src/面试/算法/S35-最长回文子串.js"
);

function cloneTree(tree) {
  return tree ? JSON.parse(JSON.stringify(tree)) : tree;
}

function createCycleList(values, pos) {
  const head = createLinkedList(values);
  if (pos < 0) return head;

  let current = head;
  let cycleNode = null;
  let index = 0;

  while (current.next) {
    if (index === pos) cycleNode = current;
    current = current.next;
    index++;
  }

  if (index === pos) cycleNode = current;
  current.next = cycleNode;

  return head;
}

async function runTests() {
  const tree = {
    val: 1,
    left: {
      val: 2,
      right: { val: 5 },
    },
    right: {
      val: 3,
      right: { val: 4 },
    },
  };

  assert.deepStrictEqual(rightSideView(tree), [1, 3, 4]);
  assert.deepStrictEqual(invertTree(cloneTree(tree)), {
    val: 1,
    left: {
      val: 3,
      left: { val: 4 },
    },
    right: {
      val: 2,
      left: { val: 5 },
    },
  });
  assert.strictEqual(findMaxTreeNode(tree).val, 5);

  const merged = mergeTwoLists(
    createLinkedList([1, 2, 4]),
    createLinkedList([1, 3, 4])
  );
  assert.deepStrictEqual(linkedListToArray(merged), [1, 1, 2, 3, 4, 4]);

  assert.deepStrictEqual(
    linkedListToArray(reverseList(createLinkedList([1, 2, 3, 4]))),
    [4, 3, 2, 1]
  );
  assert.deepStrictEqual(
    linkedListToArray(reverseKGroup(createLinkedList([1, 2, 3, 4, 5]), 2)),
    [2, 1, 4, 3, 5]
  );
  assert.strictEqual(middleNode(createLinkedList([1, 2, 3, 4, 5])).val, 3);
  assert.strictEqual(middleNode(createLinkedList([1, 2, 3, 4, 5, 6])).val, 4);
  assert.ok(new ListNode(1) instanceof ListNode);
  const cycleList = createCycleList([3, 2, 0, -4], 1);
  assert.strictEqual(typeof hasCycle, "function");
  assert.strictEqual(typeof detectCycle, "function");
  assert.strictEqual(hasCycle(cycleList), true);
  assert.strictEqual(detectCycle(cycleList).val, 2);
  assert.strictEqual(hasCycle(createLinkedList([1, 2, 3])), false);
  assert.strictEqual(detectCycle(createLinkedList([1, 2, 3])), null);

  assert.strictEqual(typeof twoSum, "function");
  assert.deepStrictEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
  assert.deepStrictEqual(twoSum([3, 2, 4], 6), [1, 2]);
  assert.deepStrictEqual(twoSum([1, 2, 3], 7), []);
  assert.strictEqual(typeof threeSum, "function");
  assert.deepStrictEqual(threeSum([-1, 0, 1, 2, -1, -4]), [
    [-1, -1, 2],
    [-1, 0, 1],
  ]);
  assert.deepStrictEqual(threeSum([0, 0, 0, 0]), [[0, 0, 0]]);

  assert.strictEqual(typeof maxSubArray, "function");
  assert.strictEqual(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
  assert.strictEqual(maxSubArray([-3, -2, -5]), -2);

  assert.strictEqual(typeof maxSlidingWindow, "function");
  assert.deepStrictEqual(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3), [
    3,
    3,
    5,
    5,
    6,
    7,
  ]);
  assert.deepStrictEqual(maxSlidingWindow([1], 1), [1]);
  assert.deepStrictEqual(maxSlidingWindow([1, 2], 0), []);

  assert.strictEqual(typeof longestPalindrome, "function");
  assert.strictEqual(longestPalindrome("babad"), "bab");
  assert.strictEqual(longestPalindrome("cbbd"), "bb");
  assert.strictEqual(longestPalindrome(""), "");

  assert.strictEqual(normalizeSeconds(5.8), 5);
  assert.strictEqual(normalizeSeconds(-1), 0);
  assert.strictEqual(formatCountdown(3661), "01:01:01");

  const lightOrder = [];
  await runTrafficLight({
    steps: trafficLight,
    cycles: 1,
    sleep: (duration) => {
      lightOrder.push(`wait:${duration}`);
      return Promise.resolve();
    },
    signal: (color) => lightOrder.push(color),
  });
  assert.deepStrictEqual(lightOrder, [
    "red",
    "wait:3000",
    "yellow",
    "wait:1000",
    "green",
    "wait:3000",
  ]);

  console.log("All tests passed");
}

runTests().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
