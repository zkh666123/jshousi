/**
 * 合并两个有序链表
 *
 * Hot100 原题：
 * LeetCode 21. 合并两个有序链表
 * https://leetcode.cn/problems/merge-two-sorted-lists/
 *
 * 题目：
 * 将两个升序链表合并为一个新的升序链表，并返回合并后的链表头节点。
 *
 * 面试里的核心是 dummy 虚拟头节点：
 * 它能统一处理「结果链表为空」和「追加节点」的逻辑。
 */

function ListNode(val = 0, next = null) {
  this.val = val;
  this.next = next;
}

/**
 * 第一版 mergeTwoLists1
 *
 * 暴力版。
 * 先把两个链表的值收集到数组，排序后重新构造链表。
 *
 * 这版简单，但没有利用两个链表本来有序的条件。
 *
 * 时间复杂度 O((m + n) log(m + n))，空间复杂度 O(m + n)。
 * @param {ListNode | null} list1
 * @param {ListNode | null} list2
 * @return {ListNode | null}
 */
function mergeTwoLists1(list1, list2) {
  const values = [];

  while (list1) {
    values.push(list1.val);
    list1 = list1.next;
  }
  while (list2) {
    values.push(list2.val);
    list2 = list2.next;
  }

  values.sort((a, b) => a - b);

  const dummy = new ListNode(0);
  let current = dummy;

  for (const value of values) {
    current.next = new ListNode(value);
    current = current.next;
  }

  return dummy.next;
}

/**
 * 第二版 mergeTwoLists2
 *
 * 递归合并。
 * 每次选择两个头节点中较小的那个，剩余部分继续递归合并。
 *
 * 时间复杂度 O(m + n)，空间复杂度 O(m + n)。
 * @param {ListNode | null} list1
 * @param {ListNode | null} list2
 * @return {ListNode | null}
 */
function mergeTwoLists2(list1, list2) {
  if (!list1) return list2;
  if (!list2) return list1;

  if (list1.val <= list2.val) {
    list1.next = mergeTwoLists2(list1.next, list2);
    return list1;
  }

  list2.next = mergeTwoLists2(list1, list2.next);
  return list2;
}

/**
 * 第三版 mergeTwoLists（面试推荐版）
 *
 * 迭代双指针 + dummy。
 * p1/p2 分别指向两个链表当前待合并节点，每次把较小节点接到结果链表后面。
 *
 * 这版现场最推荐写：
 * 1. 时间复杂度线性。
 * 2. 不需要递归栈。
 * 3. dummy 让头节点处理非常干净。
 *
 * 时间复杂度 O(m + n)，空间复杂度 O(1)。
 * @param {ListNode | null} list1
 * @param {ListNode | null} list2
 * @return {ListNode | null}
 */
function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let current = dummy;
  let p1 = list1;
  let p2 = list2;

  while (p1 && p2) {
    if (p1.val <= p2.val) {
      current.next = p1;
      p1 = p1.next;
    } else {
      current.next = p2;
      p2 = p2.next;
    }
    current = current.next;
  }

  current.next = p1 || p2;
  return dummy.next;
}

if (typeof module !== "undefined") {
  module.exports = {
    mergeTwoLists1,
    mergeTwoLists2,
    mergeTwoLists,
  };
}
