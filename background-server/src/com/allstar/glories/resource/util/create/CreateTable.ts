/*建表*/

const fs = require('fs-extra');
const sqlite = require('sqlite3').verbose();

/**
 * Builds a table.
 *
 * @return     {<type>}  The table.
 */
export const buildTable = (sql: string, dbUrl:String) => {
	let db = new sqlite.Database(dbUrl);
	db.serialize(()=> {
		db.run(sql, err=> {
			if (null != err) {
				console.error(err);
				return;
			}
			console.info('建表成功.');
		});
	});
}