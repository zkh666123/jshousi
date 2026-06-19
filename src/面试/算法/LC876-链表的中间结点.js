/**
 * 链表的中间结点
 *
 * LeetCode 原题：
 * LeetCode 876. 链表的中间结点
 * https://leetcode.cn/problems/middle-of-the-linked-list/
 *
 * 题目：
 * 给定一个非空单链表的头节点 head，返回链表的中间节点。
 * 如果有两个中间节点，则返回第二个中间节点。
 */

/**
 * 第一版 middleNode1
 *
 * 暴力版。
 * 把所有节点保存到数组，再返回 nodes[Math.floor(n / 2)]。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {ListNode | null} head
 * @return {ListNode | null}
 */
function middleNode1(head) {
  const nodes = [];
  let current = head;

  while (current) {
    nodes.push(current);
    current = current.next;
  }

  return nodes[Math.floor(nodes.length / 2)] || null;
}

/**
 * 第二版 middleNode2
 *
 * 两次遍历。
 * 第一次统计长度，第二次走到中间位置。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {ListNode | null} head
 * @return {ListNode | null}
 */
function middleNode2(head) {
  let length = 0;
  let current = head;

  while (current) {
    length++;
    current = current.next;
  }

  current = head;
  for (let i = 0; i < Math.floor(length / 2); i++) {
    current = current.next;
  }

  return current;
}

/**
 * 第三版 middleNode（面试推荐版）
 *
 * 快慢指针。
 * slow 每次走一步，fast 每次走两步。
 * 当 fast 到达结尾时，slow 正好在中点。
 *
 * 偶数长度时，因为 fast 从 head 出发并以 fast && fast.next 为循环条件，
 * slow 会落在第二个中间节点，符合题意。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {ListNode | null} head
 * @return {ListNode | null}
 */
function middleNode(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}

if (typeof module !== "undefined") {
  module.exports = {
    middleNode1,
    middleNode2,
    middleNode,
  };
}
