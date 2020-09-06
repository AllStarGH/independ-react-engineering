import { checksDB } from './CreateDatabase';
import { buildTable } from './CreateTable';

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

var dbUrl = './../database/engineering.db';

var sentence = 'CREATE TABLE IF NOT EXISTS ';
sentence += 't_user'; //表名
sentence += '(';
sentence += 'id INTEGER PRIMARY KEY,';
sentence += 'userName VARCHAR(60) NOT NULL UNIQUE,';
sentence += 'phoneNum VARCHAR(70) NOT NULL UNIQUE,';
sentence += 'userEmail VARCHAR(90) NOT NULL UNIQUE,';
sentence += 'homeAddress VARCHAR(120) NOT NULL,';
sentence += 'password CHAR(100) NOT NULL,';
sentence += 'salt CHAR(100) NOT NULL';
sentence += ');';

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

/**
 * { 1st run }
 */
function run() {
	// 创库
	let resp = checksDB(dbUrl);
	console.dir(resp);

	// 建表
	buildTable(sentence, dbUrl);
}

run();