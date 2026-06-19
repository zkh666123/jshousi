/**
 * K 个一组翻转链表
 *
 * LeetCode 原题：
 * LeetCode 25. K 个一组翻转链表
 * https://leetcode.cn/problems/reverse-nodes-in-k-group/
 *
 * 题目：
 * 给你链表的头节点 head，每 k 个节点一组进行翻转，并返回修改后的链表。
 * 如果节点总数不是 k 的整数倍，最后剩余节点保持原有顺序。
 */

/**
 * 第一版 reverseKGroup1
 *
 * 暴力版。
 * 把链表节点按顺序放入数组，每 k 个一组反转数组片段，再重新连接。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {ListNode | null} head
 * @param {number} k
 * @return {ListNode | null}
 */
function reverseKGroup1(head, k) {
  if (k <= 1) return head;

  const nodes = [];
  let current = head;

  while (current) {
    nodes.push(current);
    current = current.next;
  }

  for (let i = 0; i + k <= nodes.length; i += k) {
    let left = i;
    let right = i + k - 1;
    while (left < right) {
      [nodes[left], nodes[right]] = [nodes[right], nodes[left]];
      left++;
      right--;
    }
  }

  for (let i = 0; i < nodes.length; i++) {
    nodes[i].next = nodes[i + 1] || null;
  }

  return nodes[0] || null;
}

/**
 * 第二版 reverseKGroup2
 *
 * 递归版。
 * 先检查从 head 开始是否足够 k 个节点，够就翻转 [head, tail) 区间，
 * 再递归处理 tail 后面的链表。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n / k)。
 * @param {ListNode | null} head
 * @param {number} k
 * @return {ListNode | null}
 */
function reverseKGroup2(head, k) {
  if (!head || k <= 1) return head;

  let tail = head;
  for (let i = 0; i < k; i++) {
    if (!tail) return head;
    tail = tail.next;
  }

  const newHead = reverseRange(head, tail);
  head.next = reverseKGroup2(tail, k);

  return newHead;
}

function reverseRange(head, tail) {
  let prev = tail;
  let current = head;

  while (current !== tail) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}

/**
 * 第三版 reverseKGroup（面试推荐版）
 *
 * 迭代版 + dummy。
 * groupPrev 指向当前待翻转组的前一个节点，先找到这一组的第 k 个节点。
 * 如果不足 k 个，直接结束；否则原地翻转这一组，再把前后链表接回去。
 *
 * 这版最适合大厂追问：
 * 1. 不借助数组。
 * 2. 不用递归栈。
 * 3. 能清楚控制每一组的前驱和后继。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {ListNode | null} head
 * @param {number} k
 * @return {ListNode | null}
 */
function reverseKGroup(head, k) {
  if (!head || k <= 1) return head;

  const dummy = { next: head };
  let groupPrev = dummy;

  while (true) {
    const kth = getKthNode(groupPrev, k);
    if (!kth) break;

    const groupNext = kth.next;
    let prev = groupNext;
    let current = groupPrev.next;

    while (current !== groupNext) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    const oldGroupHead = groupPrev.next;
    groupPrev.next = kth;
    groupPrev = oldGroupHead;
  }

  return dummy.next;
}

function getKthNode(start, k) {
  let current = start;

  while (current && k > 0) {
    current = current.next;
    k--;
  }

  return current;
}

if (typeof module !== "undefined") {
  module.exports = {
    reverseKGroup1,
    reverseKGroup2,
    reverseKGroup,
  };
}
