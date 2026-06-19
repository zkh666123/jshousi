/**
 * 环形链表
 *
 * Hot100 原题：
 * LeetCode 141. 环形链表
 * https://leetcode.cn/problems/linked-list-cycle/
 *
 * 题目：
 * 给你一个链表的头节点 head，判断链表中是否有环。
 */

/**
 * 第一版 hasCycle1
 *
 * 暴力记录版。
 * 使用数组保存访问过的节点，每次用 includes 判断当前节点是否出现过。
 *
 * 时间复杂度 O(n^2)，空间复杂度 O(n)。
 * @param {ListNode | null} head
 * @return {boolean}
 */
function hasCycle1(head) {
  const visited = [];
  let current = head;

  while (current) {
    if (visited.includes(current)) return true;
    visited.push(current);
    current = current.next;
  }

  return false;
}

/**
 * 第二版 hasCycle2
 *
 * Set 记录访问过的节点。
 * 如果再次遇到同一个节点，说明有环。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {ListNode | null} head
 * @return {boolean}
 */
function hasCycle2(head) {
  const visited = new Set();
  let current = head;

  while (current) {
    if (visited.has(current)) return true;
    visited.add(current);
    current = current.next;
  }

  return false;
}

/**
 * 第三版 hasCycle（面试推荐版）
 *
 * 快慢指针。
 * slow 每次走一步，fast 每次走两步。
 * 如果无环，fast 会走到 null；如果有环，fast 一定会在环里追上 slow。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {ListNode | null} head
 * @return {boolean}
 */
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  return false;
}

if (typeof module !== "undefined") {
  module.exports = {
    hasCycle1,
    hasCycle2,
    hasCycle,
  };
}
