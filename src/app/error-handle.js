const errorTypes = require('../constants/error-types');

const errorHandle = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = '用户名或密码不能为空!';
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409;
      message = '用户名已经存在!';
      break;
    case errorTypes.USER_NOT_EXISTS:
      status = 400;
      message = '用户名不存在!';
      break;
    case errorTypes.USER_OR_PASSWORD_IS_NOT_FOUND:
      status = 400;
      message = '用户名或密码错误!';
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401;
      message = '无效的token!';
      break;
    case errorTypes.CONTENT_DOES_NO_NULL:
      status = 400;
      message = '内容不能为空!';
      break;
    case errorTypes.CAN_NOT_UPDATE:
      status = 401;
      message = '没有修改权限!';
      break;
    default:
      status = 404;
      message = 'NOT FOUND!';
  }
  ctx.status = status;
  ctx.body = {
    data: {},
    mate: {
      status,
      message
    }
  };
};

module.exports = errorHandle;
