/*创库*/

const fs = require('fs-extra');
const sqlite = require('sqlite3').verbose();

/**
 * { function_description }
 *
 * @return     {<type>}  { description_of_the_return_value }
 */
export const checksDB=dbUrl=>{
	var resp = null;

	let db=new sqlite.Database(dbUrl);
	let exist = fs.existsSync(dbUrl);

	console.log('database===');
	console.dir(db);
	console.log('exist===' + exist);

	if (!exist) {
		console.info('数据库不存在,即将创建!');
		fs.openSync(dbUrl, 'w');
		resp = new connectResp(404, '数据库不存在,即将创建!');
	} else {
		console.info('数据库业已存在,且连接成功.');
		resp = new connectResp(200, '数据库业已存在,且连接成功.');
	}
	return resp;
}

/**
 * Connects a response.
 *
 * @return     {<type>}  { description_of_the_return_value }
 */
function connectResp(code=500,msg='no response by db connects'){
	this.code = code;
	this.msg = msg || 'NULL';
}

// module.exports = checksDB;