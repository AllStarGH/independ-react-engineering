import * as fs from 'fs-extra';
import * as path from 'path';

/**
 * Gets the file content.
 *
 * @return     {<type>}  The file content.
 */
export const getJsonContext = (filePath: string) => {
	var content = fs.readFileSync(filePath, 'utf8')
	return content;
}