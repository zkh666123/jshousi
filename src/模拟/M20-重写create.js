/**
 * Object.prototype.create()
 *
 * Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
 */
Object.create2 = function (proto, propertyObject) {
  if (proto !== null && typeof proto !== "object" && typeof proto !== "function") {
    throw new TypeError("Object prototype may only be an Object or null.");
  }
  function F() {}
  F.prototype = proto;
  const obj = new F();
  // proto 为 null 时显式去掉原型链（new F() 默认还是会指向 F.prototype === null 的，这里保险一下）
  if (proto === null) {
    Object.setPrototypeOf(obj, null);
  }
  // 第二个参数是可选的；只有显式传了非 undefined 值才走 defineProperties
  // 如果传了非对象会由 defineProperties 自身抛错，无需提前判断
  if (propertyObject !== undefined) {
    Object.defineProperties(obj, propertyObject);
  }
  return obj;
};