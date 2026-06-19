/**
 * 反转链表
 *
 * Hot100 原题：
 * LeetCode 206. 反转链表
 * https://leetcode.cn/problems/reverse-linked-list/
 *
 * 题目：
 * 给定单链表的头节点 head，请反转链表，并返回反转后的链表头节点。
 *
 * 关键是处理指针断开前，要先保存 next。
 */

function ListNode(val = 0, next = null) {
  this.val = val;
  this.next = next;
}

/**
 * 第一版 reverseList1
 *
 * 暴力版。
 * 先把所有值放进数组，再从后往前重新构造链表。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {ListNode | null} head
 * @return {ListNode | null}
 */
function reverseList1(head) {
  const values = [];

  while (head) {
    values.push(head.val);
    head = head.next;
  }

  const dummy = new ListNode(0);
  let current = dummy;

  for (let i = values.length - 1; i >= 0; i--) {
    current.next = new ListNode(values[i]);
    current = current.next;
  }

  return dummy.next;
}

/**
 * 第二版 reverseList2
 *
 * 递归反转。
 * 先反转 head.next 之后的链表，再把 head 接到尾部。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {ListNode | null} head
 * @return {ListNode | null}
 */
function reverseList2(head) {
  if (!head || !head.next) return head;

  const newHead = reverseList2(head.next);
  head.next.next = head;
  head.next = null;

  return newHead;
}

/**
 * 第三版 reverseList（面试推荐版）
 *
 * 迭代三指针。
 * prev 指向已反转部分的头，current 指向待处理节点，next 保存断链前的后续节点。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {ListNode | null} head
 * @return {ListNode | null}
 */
function reverseList(head) {
  let prev = null;
  let current = head;

  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}

if (typeof module !== "undefined") {
  module.exports = {
    reverseList1,
    reverseList2,
    reverseList,
  };
}
