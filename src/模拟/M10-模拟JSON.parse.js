/**
 * 实现 JSON.parse
 *
 * JSON.parse(text[, reviver])
 */

/**
 * 方法一 eval 实现
 *
 * let obj = eval("(" + json + ")");
 *
 * 直接调用 eval 会存在安全问题，如果数据中可能不是 json 数据，而是可执行的 JavaScript 代码，那很可能会造成 XSS 攻击。
 * 因此，在调用 eval 之前，需要对数据进行校验（参考 D. Crockford 原版 json2.js 的预校验思路）。
 */
function jsonParseByEval(json) {
  const rx_one = /^[\],:{}\s]*$/;
  const rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  const rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  const rx_four = /(?:^|:|,)(?:\s*\[)+/g;

  if (
    rx_one.test(
      json.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, "")
    )
  ) {
    return eval("(" + json + ")");
  }
  throw new SyntaxError("Invalid JSON");
}

/**
 * new Function 实现
 *
 * 同样有注入风险，仅作为思路演示。
 */
function jsonParseByFunction(json) {
  return new Function("return " + json)();
}

// 示例
const jsonStr = '{ "age": 20, "name": "jack" }';
console.log(jsonParseByEval(jsonStr));
console.log(jsonParseByFunction(jsonStr));
