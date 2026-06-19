/**
 * 环形链表 II
 *
 * Hot100 原题：
 * LeetCode 142. 环形链表 II
 * https://leetcode.cn/problems/linked-list-cycle-ii/
 *
 * 题目：
 * 给定一个链表的头节点 head，返回链表开始入环的第一个节点。
 * 如果链表无环，则返回 null。
 */

/**
 * 第一版 detectCycle1
 *
 * 暴力版。
 * 使用数组保存访问过的节点，每次用 includes 判断当前节点是否出现过。
 *
 * 时间复杂度 O(n^2)，空间复杂度 O(n)。
 * @param {ListNode | null} head
 * @return {ListNode | null}
 */
function detectCycle1(head) {
  const visited = [];
  let current = head;

  while (current) {
    if (visited.includes(current)) return current;
    visited.push(current);
    current = current.next;
  }

  return null;
}

/**
 * 第二版 detectCycle2
 *
 * Set 记录访问过的节点。
 * 第一次遇到已经访问过的节点，就是入环节点。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {ListNode | null} head
 * @return {ListNode | null}
 */
function detectCycle2(head) {
  const visited = new Set();
  let current = head;

  while (current) {
    if (visited.has(current)) return current;
    visited.add(current);
    current = current.next;
  }

  return null;
}

/**
 * 第三版 detectCycle（面试推荐版）
 *
 * 快慢指针找入环点。
 * 先让 fast/slow 在环中相遇；相遇后让一个指针回到 head，
 * 另一个留在相遇点，两个指针每次都走一步，再次相遇处就是入环点。
 *
 * 推导：
 * 头节点到入环点距离为 a，入环点到相遇点距离为 b，相遇点回到入环点距离为 c。
 * slow 走了 a + b，fast 走了 a + b + n(b + c)。
 * fast 是 slow 的两倍，可推出 a = (n - 1)(b + c) + c。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {ListNode | null} head
 * @return {ListNode | null}
 */
function detectCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      let start = head;
      while (start !== slow) {
        start = start.next;
        slow = slow.next;
      }
      return start;
    }
  }

  return null;
}

if (typeof module !== "undefined") {
  module.exports = {
    detectCycle1,
    detectCycle2,
    detectCycle,
  };
}
