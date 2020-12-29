import crypto = require("crypto");

/*
 *根据MD5加密机制和UUID来获取密码密文
 *参数:0-前台提交之密码,1-后台生成之UUID(即盐值)
 */

/**
 * Gets the screct text.
 *
 * @return     {<type>}  The screct text.
 */
export const getScrectText = (password: string, uuid:string):string => {
	var screctText = crypto.createHash('md5')
	.update(uuid + password + uuid)
	.digest('hex');
	console.log('screctText === ' + screctText);
	return screctText;
}