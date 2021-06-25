const connection = require('../app/database');
const getNowTime = require('../utils/utils').getNowTime;

class UserService {
  /** 用户注册接口
   * @param {Object} user 用户信息
   * @returns 结果
   */
  async regist(user) {
    const { user_name, user_password } = user;
    const user_regist_time = getNowTime();
    console.log(user);
    const statement = `
      INSERT INTO pdxing_users ( user_name,user_password,user_nickname,user_regist_time )
      VALUES
      ( ? , ? , ? , ?)
    `;
    const result = await connection.execute(statement, [
      user_name,
      user_password,
      user_name,
      user_regist_time
    ]);
    console.log(result);
    return result[0];
  }

  /** 根据用户名查找用户接口
   * @param {String} user_name 用户名
   * @returns 结果
   */
  async getUserByName(user_name) {
    const statement = `
      SELECT *
      FROM pdxing_users
      WHERE user_name = ?
    `;
    const result = await connection.execute(statement, [user_name]);
    return result[0];
  }

  /** 更新用户最后一次登录ip和时间
   * @param {Number} user_id 用户id
   * @param {String} user_last_login_ip 最后一次登录ip
   */
  async updateLastLoginIp(user_id, user_last_login_ip) {
    const user_last_login_time = getNowTime();
    const statement = `
      UPDATE pdxing_users
      SET user_last_login_ip = ? , user_last_login_time = ?
      WHERE user_id = ?;
    `;
    const result = connection.execute(statement, [
      user_last_login_ip,
      user_last_login_time,
      user_id
    ]);

    return result[0];
  }
}

module.exports = new UserService();
