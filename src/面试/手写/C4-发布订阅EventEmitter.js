/**
 * 发布订阅 EventEmitter
 *
 * 核心能力：
 * 1. on：注册监听器。
 * 2. emit：触发事件。
 * 3. off：移除监听器。
 * 4. once：注册只触发一次的监听器。
 */

/**
 * 第一版 EventEmitter1
 *
 * 基础版。
 * 用普通对象保存事件名和监听器数组，只实现 on 和 emit。
 *
 * 这版能说明发布订阅的核心模型，但缺少 off/once。
 */
class EventEmitter1 {
  constructor() {
    this.events = Object.create(null);
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  emit(eventName, ...args) {
    const listeners = this.events[eventName];
    if (!listeners) return false;

    listeners.forEach((listener) => listener(...args));
    return true;
  }
}

/**
 * 第二版 EventEmitter2
 *
 * 增加 off 和 once。
 * once 通过包一层 wrappedListener 实现，触发后自动 off。
 *
 * 这版功能更完整，但 emit 时如果监听器内部修改队列，可能影响当前轮遍历。
 */
class EventEmitter2 {
  constructor() {
    this.events = new Map();
  }

  on(eventName, listener) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(listener);
    return this;
  }

  off(eventName, listener) {
    const listeners = this.events.get(eventName);
    if (!listeners) return this;

    this.events.set(
      eventName,
      listeners.filter((item) => item !== listener && item.rawListener !== listener)
    );
    return this;
  }

  once(eventName, listener) {
    const wrappedListener = (...args) => {
      this.off(eventName, wrappedListener);
      listener(...args);
    };
    wrappedListener.rawListener = listener;
    return this.on(eventName, wrappedListener);
  }

  emit(eventName, ...args) {
    const listeners = this.events.get(eventName);
    if (!listeners || listeners.length === 0) return false;

    listeners.forEach((listener) => listener(...args));
    return true;
  }
}

/**
 * 第三版 EventEmitter（面试推荐版）
 *
 * Map + 快照遍历 + 完整 on/off/once。
 *
 * 这版现场更推荐：
 * 1. 用 Map 避免普通对象原型字段冲突。
 * 2. on/off/once 返回 this，支持注册侧链式调用。
 * 3. emit 返回 boolean，表示是否有监听器被触发。
 * 4. emit 前复制一份 listeners，避免当前轮触发被 off/on 修改影响。
 * 5. off 后如果事件队列为空，删除事件名。
 * 6. once 包装函数保留 rawListener，允许用原 listener 取消。
 */
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(eventName, listener) {
    if (typeof listener !== "function") {
      throw new TypeError("listener must be a function");
    }
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(listener);
    return this;
  }

  off(eventName, listener) {
    const listeners = this.events.get(eventName);
    if (!listeners) return this;

    const nextListeners = listeners.filter(
      (item) => item !== listener && item.rawListener !== listener
    );

    if (nextListeners.length) {
      this.events.set(eventName, nextListeners);
    } else {
      this.events.delete(eventName);
    }

    return this;
  }

  once(eventName, listener) {
    if (typeof listener !== "function") {
      throw new TypeError("listener must be a function");
    }

    const wrappedListener = (...args) => {
      this.off(eventName, wrappedListener);
      listener(...args);
    };
    wrappedListener.rawListener = listener;

    return this.on(eventName, wrappedListener);
  }

  emit(eventName, ...args) {
    const listeners = this.events.get(eventName);
    if (!listeners || listeners.length === 0) return false;

    listeners.slice().forEach((listener) => listener(...args));
    return true;
  }
}

if (typeof module !== "undefined") {
  module.exports = {
    EventEmitter1,
    EventEmitter2,
    EventEmitter,
  };
}
