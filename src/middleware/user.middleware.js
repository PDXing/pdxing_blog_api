const jwt = require('jsonwebtoken');

const errorTypes = require('../constants/error-types');
const userService = require('../service/user.service');
const md5password = require('../utils/utils').md5password;
const { PUBLIC_KEY } = require('../app/config');

/** 用户注册验证
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const verifyUser = async (ctx, next) => {
  // 1.获取用户和密码
  const { user_name, user_password } = ctx.request.body;
  // 2.判断用户名或密码是否为空
  if (!user_name || !user_password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  // 3.判断用户名是否存在
  const result = await userService.getUserByName(user_name);
  // console.log(result);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  // console.log(ctx);
  await next();
};

/** 用户登录验证
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const verifyLogin = async (ctx, next) => {
  // 1.获取用户名和密码
  const { user_name, user_password } = ctx.request.body;
  // 2.判断用户名或密码是否为空
  if (!user_name || !user_password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  // 3.判断用户名是否存在
  const result = await userService.getUserByName(user_name);
  const user = result[0];
  // console.log(user)
  if (!user) {
    const error = new Error(errorTypes.USER_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  // 4.校验密码
  console.log(user);
  if (md5password(user_password) !== user.user_password) {
    const error = new Error(errorTypes.USER_OR_PASSWORD_IS_NOT_FOUND);
    return ctx.app.emit('error', error, ctx);
  }

  ctx.user = user;
  await next();
};

/** token验证
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx);
  }
  const token = authorization.replace('Bearer ', '');

  // 验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    });
    ctx.user = result;
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit('error', error, ctx);
  }

  await next();
};

/** 用户密码处理
 * @param {*} ctx
 * @param {*} next
 */
const handlePassword = async (ctx, next) => {
  let { user_password } = ctx.request.body;
  ctx.request.body.user_password = md5password(user_password);
  await next();
};

module.exports = {
  verifyUser,
  verifyLogin,
  verifyAuth,
  handlePassword
};
