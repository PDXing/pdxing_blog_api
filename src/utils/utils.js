const crypto = require('crypto');
const config = require('../app/config');

/** 加密密码
 * @param {String} password 明文密码
 * @returns 加密密码
 */
const md5password = (password) => {
  const md5 = crypto.createHash('md5');
  let result = md5.update(password + config.PRIVATE_KEY).digest('hex');
  return result;
};

/** 获取客户端ip
 * @returns 客户端ip
 */
const getIPAddress = () => {
  let interfaces = require('os').networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
};

/** 获取当前时间
 * @returns 当前时间 '2021/6/25 下午3:03:36'
 */
const getNowTime = () => {
  return (
    new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  );
};

module.exports = {
  getIPAddress,
  md5password,
  getNowTime
};
