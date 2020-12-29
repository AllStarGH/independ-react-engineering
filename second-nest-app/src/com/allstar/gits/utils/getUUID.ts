/**
 * Gets the uuid.
 *
 * @return     {<type>}  The uuid.
 */
export const getUUID = (): string => {
	let s = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

	s = s.replace(/[xy]/g, ch => {
		let r = Math.random() * 16 | 0;
		let v = ch == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
	s = s.replace(/-/g, '');
	console.log('UUID == ' + s);

	return s;
}
