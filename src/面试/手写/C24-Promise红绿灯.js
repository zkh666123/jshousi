/**
 * Promise 红绿灯
 *
 * 要求：
 * 红灯 3s，黄灯 1s，绿灯 3s，按顺序循环执行。
 */

const trafficLight = [
  { color: "red", duration: 3000 },
  { color: "yellow", duration: 1000 },
  { color: "green", duration: 3000 },
];

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

/**
 * 第一版 runTrafficLight1
 *
 * Promise 链式写法。
 * 每一轮都按红 -> 黄 -> 绿的顺序串起来。
 *
 * 这版适合理解 Promise 串行控制，但灯的配置写死了，扩展性一般。
 *
 * @param {{ signal?: Function, wait?: Function }} options
 * @return {Promise<void>}
 */
function runTrafficLight1(options = {}) {
  const {
    signal = console.log,
    wait = sleep,
  } = options;

  return wait(3000)
    .then(() => signal("red", trafficLight[0]))
    .then(() => wait(1000))
    .then(() => signal("yellow", trafficLight[1]))
    .then(() => wait(3000))
    .then(() => signal("green", trafficLight[2]));
}

/**
 * 第二版 runTrafficLight2
 *
 * async/await + 固定步骤。
 * 代码读起来更像同步流程，但仍然只执行一轮固定红绿灯。
 *
 * @param {{ signal?: Function, wait?: Function }} options
 * @return {Promise<void>}
 */
async function runTrafficLight2(options = {}) {
  const {
    signal = console.log,
    wait = sleep,
  } = options;

  for (const step of trafficLight) {
    signal(step.color, step);
    await wait(step.duration, step);
  }
}

/**
 * 第三版 runTrafficLight（面试推荐版）
 *
 * async/await + 可配置步骤 + 可控制循环次数。
 *
 * 这版现场更推荐：
 * 1. steps 可配置，红绿灯顺序和耗时不写死。
 * 2. cycles 可传具体次数，方便测试；真实循环可以传 Infinity。
 * 3. wait 和 signal 可注入，单元测试时不用真的等 3 秒。
 *
 * @param {{ steps?: Array<{ color: string, duration: number }>, cycles?: number, wait?: Function, signal?: Function }} options
 * @return {Promise<void>}
 */
async function runTrafficLight(options = {}) {
  const {
    steps = trafficLight,
    cycles = 1,
    wait = sleep,
    signal = console.log,
  } = options;

  for (let i = 0; i < cycles; i++) {
    for (const step of steps) {
      signal(step.color, step);
      await wait(step.duration, step);
    }
  }
}

async function startTrafficLight() {
  await runTrafficLight({ cycles: Infinity });
}

if (typeof module !== "undefined") {
  module.exports = {
    trafficLight,
    sleep,
    runTrafficLight1,
    runTrafficLight2,
    runTrafficLight,
    startTrafficLight,
  };
}
