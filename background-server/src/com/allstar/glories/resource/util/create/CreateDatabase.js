"use strict";
/*创库*/
exports.__esModule = true;
exports.checksDB = void 0;
var fs = require('fs-extra');
var sqlite = require('sqlite3').verbose();
/**
 * { function_description }
 *
 * @return     {<type>}  { description_of_the_return_value }
 */
exports.checksDB = function (dbUrl) {
    var resp = null;
    var db = new sqlite.Database(dbUrl);
    var exist = fs.existsSync(dbUrl);
    console.log('database===');
    console.dir(db);
    console.log('exist===' + exist);
    if (!exist) {
        console.info('数据库不存在,即将创建!');
        fs.openSync(dbUrl, 'w');
        resp = new connectResp(404, '数据库不存在,即将创建!');
    }
    else {
        console.info('数据库业已存在,且连接成功.');
        resp = new connectResp(200, '数据库业已存在,且连接成功.');
    }
    return resp;
};
/**
 * Connects a response.
 *
 * @return     {<type>}  { description_of_the_return_value }
 */
function connectResp(code, msg) {
    if (code === void 0) { code = 500; }
    if (msg === void 0) { msg = 'no response by db connects'; }
    this.code = code;
    this.msg = msg || 'NULL.';
}
// module.exports = checksDB;
