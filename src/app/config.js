const fs = require('fs');
const path = require('path');

const dotenv = require('dotenv');

dotenv.config();

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, './keys/private.key')
);
const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, './keys/PUBLIC.key')
);

// console.log(process.env.APP_PORT)

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  PASSWORD_MD5
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
