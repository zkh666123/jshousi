/**
 * LRU 缓存机制
 *
 * Hot100 原题：
 * LeetCode 146. LRU 缓存
 * https://leetcode.cn/problems/lru-cache/
 *
 * 题目：
 * 请你设计并实现一个满足 LRU（最近最少使用）缓存约束的数据结构。
 * get 和 put 都要求平均 O(1) 时间复杂度。
 *
 * LRU 的淘汰规则：
 * 1. 最近访问过的数据放到最新位置。
 * 2. 容量满时，淘汰最久没有被访问的数据。
 *
 * 面试里要主动说明：
 * 只用哈希表可以 O(1) 查找，但不知道谁最旧；
 * 只用链表可以维护新旧顺序，但查找是 O(n)。
 * 所以最标准的结构是「哈希表 + 双向链表」。
 */

/**
 * 第一版 LRUCache1
 *
 * Object + keys 数组。
 * Object 负责按 key 找 value，keys 数组负责维护从旧到新的访问顺序。
 *
 * 这版容易理解，但每次访问都要在 keys 里 indexOf/splice，复杂度是 O(n)。
 */
function LRUCache1(capacity) {
  this.capacity = capacity;
  this.cache = Object.create(null);
  this.keys = [];
}

LRUCache1.prototype.get = function (key) {
  if (!Object.prototype.hasOwnProperty.call(this.cache, key)) return -1;

  moveArrayKeyToTail(this.keys, key);
  return this.cache[key];
};

LRUCache1.prototype.put = function (key, value) {
  if (Object.prototype.hasOwnProperty.call(this.cache, key)) {
    this.cache[key] = value;
    moveArrayKeyToTail(this.keys, key);
    return;
  }

  this.cache[key] = value;
  this.keys.push(key);

  if (this.keys.length > this.capacity) {
    const oldestKey = this.keys.shift();
    delete this.cache[oldestKey];
  }
};

function moveArrayKeyToTail(keys, key) {
  const index = keys.indexOf(key);
  if (index !== -1) keys.splice(index, 1);
  keys.push(key);
}

/**
 * 第二版 LRUCache2
 *
 * Map 版本。
 * JS 的 Map 会按插入顺序迭代，所以访问一个 key 时，可以先 delete 再 set，
 * 把它移动到最新位置；淘汰时删除 Map 的第一个 key。
 *
 * 这版写法很短，实际刷题也经常能通过。
 * 但面试官追问底层设计时，最好继续说出双向链表版本。
 */
class LRUCache2 {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }

    this.cache.set(key, value);
  }
}

class LRUNode {
  constructor(key = 0, value = 0) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

/**
 * 第三版 LRUCache（面试推荐版）
 *
 * 哈希表 + 双向链表。
 * 1. Map 保存 key -> node，保证 O(1) 查找。
 * 2. 双向链表按使用新旧排序，头部最旧，尾部最新。
 * 3. 使用 dummyHead / dummyTail，避免处理空链表和边界节点的特殊分支。
 *
 * get：
 * 找不到返回 -1；找到后移动到尾部，表示最近使用。
 *
 * put：
 * key 存在则更新 value 并移动到尾部；
 * key 不存在则新建节点放到尾部；
 * 如果超过容量，删除头部最旧节点。
 *
 * 时间复杂度 get/put 均为 O(1)，空间复杂度 O(capacity)。
 */
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.dummyHead = new LRUNode();
    this.dummyTail = new LRUNode();
    this.dummyHead.next = this.dummyTail;
    this.dummyTail.prev = this.dummyHead;
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    const node = this.cache.get(key);
    this.removeNode(node);
    this.addToTail(node);
    return node.value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      node.value = value;
      this.removeNode(node);
      this.addToTail(node);
      return;
    }

    const node = new LRUNode(key, value);
    this.cache.set(key, node);
    this.addToTail(node);

    if (this.cache.size > this.capacity) {
      const oldest = this.dummyHead.next;
      this.removeNode(oldest);
      this.cache.delete(oldest.key);
    }
  }

  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  addToTail(node) {
    const prev = this.dummyTail.prev;
    prev.next = node;
    node.prev = prev;
    node.next = this.dummyTail;
    this.dummyTail.prev = node;
  }
}

if (typeof module !== "undefined") {
  module.exports = {
    LRUCache1,
    LRUCache2,
    LRUCache,
  };
}
