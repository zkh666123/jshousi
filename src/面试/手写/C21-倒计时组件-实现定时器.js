/**
 * React 倒计时组件
 *
 * 要求：
 * 1. 接收一个初始时间 initialSeconds。
 * 2. 每秒递减，到 0 自动停止。
 * 3. 支持开始、暂停、重置。
 *
 * 注意：
 * 本项目没有 React/JSX 编译配置，所以可运行组件使用 React.createElement 写法。
 */

function normalizeSeconds(seconds) {
  const value = Number(seconds);
  if (!Number.isFinite(value) || value <= 0) return 0;
  return Math.floor(value);
}

function formatCountdown(seconds) {
  const total = normalizeSeconds(seconds);
  const hour = Math.floor(total / 3600);
  const minute = Math.floor((total % 3600) / 60);
  const second = total % 60;
  const pad = (num) => String(num).padStart(2, "0");

  return `${pad(hour)}:${pad(minute)}:${pad(second)}`;
}

/**
 * 第一版 createCountdownTimer
 *
 * 基础定时器版。
 * 不依赖 React，只演示倒计时状态如何递减、暂停和重置。
 *
 * 这版适合理解核心定时器逻辑，但不是组件。
 *
 * @param {number} initialSeconds
 * @param {(seconds: number) => void} onTick
 * @param {() => void} onComplete
 * @return {{ start: Function, pause: Function, reset: Function, getLeftSeconds: Function }}
 */
function createCountdownTimer(initialSeconds, onTick, onComplete) {
  const initTime = normalizeSeconds(initialSeconds);
  let leftSeconds = initTime;
  let timer = null;

  function clearTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function tick() {
    leftSeconds = Math.max(leftSeconds - 1, 0);
    if (typeof onTick === "function") onTick(leftSeconds);

    if (leftSeconds === 0) {
      clearTimer();
      if (typeof onComplete === "function") onComplete();
    }
  }

  return {
    start() {
      if (timer || leftSeconds <= 0) return;
      timer = setInterval(tick, 1000);
    },
    pause() {
      clearTimer();
    },
    reset() {
      clearTimer();
      leftSeconds = initTime;
      if (typeof onTick === "function") onTick(leftSeconds);
    },
    getLeftSeconds() {
      return leftSeconds;
    },
  };
}

function getReactRuntime() {
  if (typeof React !== "undefined") return React;
  if (typeof require === "function") return require("react");
  return null;
}

/**
 * 第二版 useCountdown
 *
 * Hook 版。
 * 把倒计时状态和操作封装成 Hook，组件只负责渲染。
 *
 * @param {number} initialSeconds
 * @param {Function} onComplete
 * @return {{ leftSeconds: number, running: boolean, start: Function, pause: Function, reset: Function }}
 */
function useCountdown(initialSeconds, onComplete) {
  const ReactRuntime = getReactRuntime();
  if (!ReactRuntime) throw new Error("useCountdown 需要 React 运行时");

  const initTime = normalizeSeconds(initialSeconds);
  const [leftSeconds, setLeftSeconds] = ReactRuntime.useState(initTime);
  const [running, setRunning] = ReactRuntime.useState(initTime > 0);

  ReactRuntime.useEffect(() => {
    setLeftSeconds(initTime);
    setRunning(initTime > 0);
  }, [initTime]);

  ReactRuntime.useEffect(() => {
    if (!running || leftSeconds <= 0) return undefined;

    const timer = setTimeout(() => {
      setLeftSeconds(leftSeconds - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [leftSeconds, running]);

  ReactRuntime.useEffect(() => {
    if (leftSeconds === 0) {
      setRunning(false);
      if (typeof onComplete === "function") onComplete();
    }
  }, [leftSeconds, onComplete]);

  return {
    leftSeconds,
    running,
    start() {
      if (leftSeconds > 0) setRunning(true);
    },
    pause() {
      setRunning(false);
    },
    reset() {
      setLeftSeconds(initTime);
      setRunning(initTime > 0);
    },
  };
}

/**
 * 第三版 Countdown（面试推荐版）
 *
 * React 组件版。
 *
 * 这版现场更推荐：
 * 1. 计时逻辑收进 useCountdown，渲染逻辑更干净。
 * 2. initialSeconds 改变时会重置倒计时。
 * 3. 每个定时器 effect 都清理 timeout，避免组件卸载后继续 setState。
 * 4. 开始、暂停、重置三个交互都完整。
 *
 * JSX 对照：
 * <div className="countdown">
 *   <span>{formatCountdown(leftSeconds)}</span>
 *   <button onClick={start}>开始</button>
 *   <button onClick={pause}>暂停</button>
 *   <button onClick={reset}>重置</button>
 * </div>
 *
 * @param {{ initialSeconds?: number, onComplete?: Function }} props
 * @return {object}
 */
function Countdown(props = {}) {
  const ReactRuntime = getReactRuntime();
  if (!ReactRuntime) throw new Error("Countdown 需要 React 运行时");

  const {
    initialSeconds = 0,
    onComplete,
  } = props;
  const {
    leftSeconds,
    start,
    pause,
    reset,
  } = useCountdown(initialSeconds, onComplete);

  return ReactRuntime.createElement(
    "div",
    { className: "countdown" },
    ReactRuntime.createElement("span", null, formatCountdown(leftSeconds)),
    ReactRuntime.createElement("button", { onClick: start }, "开始"),
    ReactRuntime.createElement("button", { onClick: pause }, "暂停"),
    ReactRuntime.createElement("button", { onClick: reset }, "重置")
  );
}

if (typeof module !== "undefined") {
  module.exports = {
    Countdown,
    useCountdown,
    createCountdownTimer,
    normalizeSeconds,
    formatCountdown,
  };
}
