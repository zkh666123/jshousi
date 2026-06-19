/**
 * JSONP
 *
 * 一种跨域请求的解决方案，它利用了 <script> 标签可以加载跨域 JavaScript 脚本的特性。JSONP 通过动态创建一个 <script> 标签，并将该标签的 src 属性设置为一个远程 URL，这个 URL 会返回一个被调用的函数，该函数的参数包含了所需的数据。
 * 
 * script标签不遵循同源协议，可以用来进行跨域请求，优点就是兼容性好但仅限于GET请求
 * 
 * jsonp 返回的是一个 Promise
 * 
 * 1. 服务端需要识别 JSONP 请求，并返回一个特定格式的响应。这个响应是一个函数调用，函数名由请求的查询参数指定，并将数据作为参数传递给这个函数。例如，如果客户端请求https://example.com/api?callback=myCallback，服务端可能返回 myCallback({"name": "John", "age": 30});。
 * 2. 客户端在HTML页面中定义一个回调函数，然后通过<script>标签发起JSONP请求。例如：
 */

/**
 * ⼿动实现⼀个JSONP⽅法
 * @param {string} url   JSONP请求地址，返回⼀个js⽂件
 * @param {Object} _params JSONP请求中的url参数，key为字符串，value为数字或者字符串。
 *                         可在其中通过 callbackName 字段指定回调函数名（默认为 "callback"）
 */
function JSONP(url, _params = {}) {
  // 把 callbackName 从查询参数中分离出来
  const { callbackName = "callback", ...rest } = _params;
  // callback 名也要拼到 URL 上，服务端才知道用哪个名字包裹返回值
  const queryParts = Object.keys(rest).map(
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(rest[key])}`
  );
  queryParts.push(`callback=${encodeURIComponent(callbackName)}`);

  const script = document.createElement("script");
  script.src = `${url}?${queryParts.join("&")}`;

  return new Promise((resolve, reject) => {
    window[callbackName] = (result) => {
      resolve(result);
      script.parentNode && script.parentNode.removeChild(script);
      delete window[callbackName];
    };
    script.onerror = (e) => {
      reject(e);
      script.parentNode && script.parentNode.removeChild(script);
      delete window[callbackName];
    };
    document.body.appendChild(script);
  });
}

// ⽤例（包在 async 函数里，避免依赖顶层 await）
async function demo() {
  const result = await JSONP("http://xxx.alipay.com/jsonp", {
    user: "xxx",
    callbackName: "callback",
  });
  console.log(JSON.stringify(result));
}
// demo();

// http://xxx.alipay.com/jsonp 返回⼀个js⽂件，内容形如：
// callback({ input: { user: "xxx" }, output: { test: 1 } });
