const userService = require('../service/user.service');
const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config');
const getIPAddress = require('../utils/utils').getIPAddress;

class UserController {
  /** 用户注册接口
   * @param {*} ctx
   * @param {*} next
   */
  async regist(ctx, next) {
    const user = ctx.request.body;
    const res = await userService.regist(user);
    ctx.body = {
      data: {
        user_id: res.insertId
      },
      mate: {
        status: 201,
        msg: '用户注册成功！'
      }
    };
  }

  /** 用户登录接口
   * @param {*} ctx
   * @param {*} next
   */
  async login(ctx, next) {
    // ctx.body = '用户创建成功~'
    // 获取用户传递的参数
    const { user_id, user_name } = ctx.user;
    const token = jwt.sign({ user_id, user_name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    });

    // 更新ip
    const user_last_login_ip = getIPAddress();
    const res = await userService.updateLastLoginIp(
      user_id,
      user_last_login_ip
    );

    console.log(res);
    ctx.body = {
      data: {
        user_id,
        user_name,
        token
      },
      meta: {
        status: 200,
        message: '登录成功!'
      }
    };
    // const user = ctx.request.body;

    // // console.log(user);
    // const res = await service.login(user);

    // if (res.length !== 0) {
    //   const { user_id, user_name } = res[0];
    //   const token = jwt.sign({ user_id, user_name }, PRIVATE_KEY, {
    //     expiresIn: 60 * 60 * 24,
    //     algorithm: 'RS256'
    //   });
    //   ctx.body = {
    //     data: res[0],
    //     meta: {
    //       status: 200,
    //       token,
    //       msg: '登录成功！'
    //     }
    //   };
    // } else {
    //   ctx.body = {
    //     data: {},
    //     meta: {
    //       status: 401,
    //       msg: '用户名或密码错误！'
    //     }
    //   };
    // }
  }
}

module.exports = new UserController();
