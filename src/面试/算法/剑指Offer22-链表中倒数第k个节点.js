/**
 * 链表中倒数第 k 个节点
 *
 * 剑指 Offer 22：
 * https://leetcode.cn/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/
 *
 * 题目：
 * 输入一个链表，输出该链表中倒数第 k 个节点。
 */

/**
 * 第一版 getKthFromEnd1
 *
 * 暴力版。
 * 先遍历链表保存所有节点，再按数组下标取倒数第 k 个。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {ListNode | null} head
 * @param {number} k
 * @return {ListNode | null}
 */
function getKthFromEnd1(head, k) {
  const nodes = [];
  let current = head;

  while (current) {
    nodes.push(current);
    current = current.next;
  }

  return nodes[nodes.length - k] || null;
}

/**
 * 第二版 getKthFromEnd2
 *
 * 两次遍历。
 * 第一次统计链表长度 n，第二次走到第 n - k 个节点。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {ListNode | null} head
 * @param {number} k
 * @return {ListNode | null}
 */
function getKthFromEnd2(head, k) {
  let length = 0;
  let current = head;

  while (current) {
    length++;
    current = current.next;
  }

  current = head;
  for (let i = 0; i < length - k; i++) {
    current = current.next;
  }

  return current;
}

/**
 * 第三版 getKthFromEnd（面试推荐版）
 *
 * 快慢指针。
 * fast 先走 k 步，然后 fast 和 slow 同时走。
 * 当 fast 到达 null 时，slow 正好在倒数第 k 个节点。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {ListNode | null} head
 * @param {number} k
 * @return {ListNode | null}
 */
function getKthFromEnd(head, k) {
  let fast = head;
  let slow = head;

  for (let i = 0; i < k; i++) {
    if (!fast) return null;
    fast = fast.next;
  }

  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }

  return slow;
}

if (typeof module !== "undefined") {
  module.exports = {
    getKthFromEnd1,
    getKthFromEnd2,
    getKthFromEnd,
  };
}
