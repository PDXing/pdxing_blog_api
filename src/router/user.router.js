const Router = require('koa-router');

const { regist, login } = require('../controller/user.controller');
const {
  verifyUser,
  verifyLogin,
  handlePassword
} = require('../middleware/user.middleware');

const userRouter = new Router();

// 用户登录接口
userRouter.post('/regist', verifyUser, handlePassword, regist);
userRouter.post('/login', verifyLogin, handlePassword, login);

module.exports = userRouter;
