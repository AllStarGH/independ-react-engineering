"use strict";
/*建表*/
exports.__esModule = true;
exports.buildTable = void 0;
var fs = require('fs-extra');
var sqlite = require('sqlite3').verbose();
/**
 * Builds a table.
 *
 * @return     {<type>}  The table.
 */
exports.buildTable = function (sql, dbUrl) {
    var db = new sqlite.Database(dbUrl);
    db.serialize(function () {
        db.run(sql, function (err) {
            if (null != err) {
                console.error(err);
                return;
            }
            console.info('建表成功.');
        });
    });
};
