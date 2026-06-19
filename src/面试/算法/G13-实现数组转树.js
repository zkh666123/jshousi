/**
 * 数组转树 arrayToTree
 *
 * 题目：
 * 给定一个扁平数组，每个节点包含 id 和 parentId，把它转换成树结构。
 *
 * 示例：
 * [
 *   { id: 1, val: "学校", parentId: null },
 *   { id: 2, val: "班级1", parentId: 1 },
 *   { id: 3, val: "班级2", parentId: 1 }
 * ]
 *
 * 转换后：
 * [
 *   {
 *     id: 1,
 *     val: "学校",
 *     parentId: null,
 *     children: [
 *       { id: 2, val: "班级1", parentId: 1, children: [] },
 *       { id: 3, val: "班级2", parentId: 1, children: [] }
 *     ]
 *   }
 * ]
 */

/**
 * 第一版 arrayToTree1
 *
 * 暴力递归。
 * 每找一个父节点，都重新扫描整个数组，找到它的直接子节点，再递归处理子节点。
 *
 * 思路直观，但每层递归都会扫数组，数据量大时性能不好。
 *
 * 时间复杂度最坏 O(n^2)，空间复杂度 O(h)，h 为树高。
 * @param {Array<object>} list
 * @param {number|string|null} rootParentId
 * @return {Array<object>}
 */
function arrayToTree1(list, rootParentId = null) {
  if (!Array.isArray(list)) return [];

  function build(parentId) {
    const children = [];

    for (const item of list) {
      if (item.parentId === parentId) {
        children.push({
          ...item,
          children: build(item.id),
        });
      }
    }

    return children;
  }

  return build(rootParentId);
}

/**
 * 第二版 arrayToTree2
 *
 * Map 两趟遍历。
 * 第一趟把所有节点按 id 存进 Map，第二趟把每个节点挂到父节点 children 上。
 *
 * 这版已经是线性复杂度，但会默认 parentId 为 null 的节点才是根节点；
 * 如果父节点缺失，可以按业务选择忽略、收集异常或作为根节点处理。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {Array<object>} list
 * @return {Array<object>}
 */
function arrayToTree2(list) {
  if (!Array.isArray(list)) return [];

  const nodeMap = new Map();
  const roots = [];

  for (const item of list) {
    nodeMap.set(item.id, {
      ...item,
      children: [],
    });
  }

  for (const item of list) {
    const node = nodeMap.get(item.id);

    if (item.parentId === null || item.parentId === undefined) {
      roots.push(node);
      continue;
    }

    const parent = nodeMap.get(item.parentId);
    if (parent) {
      parent.children.push(node);
    }
  }

  return roots;
}

/**
 * 第三版 arrayToTree（面试推荐版）
 *
 * Map 两趟遍历 + 可配置字段 + 异常数据收集。
 *
 * 这版现场更推荐：
 * 1. 不修改原数组里的节点对象。
 * 2. 支持自定义 id、parentId、children 字段名。
 * 3. 父节点缺失的数据不会静默丢失，会放进 orphanNodes 方便排查。
 * 4. 返回 roots，兼容多个根节点。
 *
 * 时间复杂度 O(n)，空间复杂度 O(n)。
 * @param {Array<object>} list
 * @param {{ id?: string, parentId?: string, children?: string }} config
 * @return {{ roots: Array<object>, orphanNodes: Array<object> }}
 */
function arrayToTree(list, config = {}) {
  if (!Array.isArray(list)) {
    return {
      roots: [],
      orphanNodes: [],
    };
  }

  const {
    id = "id",
    parentId = "parentId",
    children = "children",
  } = config;

  const nodeMap = new Map();
  const roots = [];
  const orphanNodes = [];

  for (const item of list) {
    nodeMap.set(item[id], {
      ...item,
      [children]: [],
    });
  }

  for (const item of list) {
    const node = nodeMap.get(item[id]);
    const parentKey = item[parentId];

    if (parentKey === null || parentKey === undefined || parentKey === "") {
      roots.push(node);
      continue;
    }

    const parent = nodeMap.get(parentKey);
    if (parent) {
      parent[children].push(node);
    } else {
      orphanNodes.push(node);
    }
  }

  return {
    roots,
    orphanNodes,
  };
}

if (typeof module !== "undefined") {
  module.exports = {
    arrayToTree1,
    arrayToTree2,
    arrayToTree,
  };
}
