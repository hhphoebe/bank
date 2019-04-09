/**
 * FileName: utils
 * Auth: Linn
 * Created at: 2018/8/3
 * Description:
 */

/**
 * 服务器请求地址
 */
const domain = requestUrl;

Date.prototype.toJSON = function () {
	let date = this;
	let y = date.getFullYear();
	let m = date.getMonth()+1;
	let d = date.getDate();
	let h = date.getHours();
	let mm = date.getMinutes();
	let s = date.getSeconds();
	let ms = date.getMilliseconds();
	m = m<10?'0'+m:m;
	d = d<10?'0'+d:d;
	h = h<10?'0'+h:h;
	mm = mm<10?'0'+mm:mm;
	s = s<10?'0'+s:s;
	return `${y}-${m}-${d} ${h}:${mm}:${s}.${ms}`;
};

Date.prototype.toDateString = function () {
	let date = this;
	let y = date.getFullYear();
	let m = date.getMonth()+1;
	let d = date.getDate();
	let h = date.getHours();
	let mm = date.getMinutes();
	let s = date.getSeconds();
	m = m<10?'0'+m:m;
	d = d<10?'0'+d:d;
	h = h<10?'0'+h:h;
	mm = mm<10?'0'+mm:mm;
	s = s<10?'0'+s:s;
	return `${y}-${m}-${d} ${h}:${mm}:${s}`;
}

Date.prototype.getMomentString = function () {
	let date = this;
	let h = date.getHours();
	let mm = date.getMinutes();
	return `${h}:${mm}`;
}

Date.prototype.getDateString = function () {
	let date = this;
	let y = date.getFullYear();
	let m = date.getMonth()+1;
	let d = date.getDate();
	return `${y}-${m}-${d}`;
}

Number.prototype.toLocaleExponential = function (n=2, v=1000) {
	return this>v?this.toExponential(n):this;
}

/**
 * 时间修改格式的方法
 */
String.prototype.toDateString = function () {
	let s = this;
	return s.replace('T', ' ').slice(0, -4);
};


/**
 * 生成验证码
 * @param codeLength
 * @returns {string}
 */
const createCode = function (codeLength) {
	let code = ``;
	//所有候选组成验证码的字符，当然也可以用中文的
	let selectChar = new Array(2, 3, 4, 5, 6, 7, 8, 9,
		'A','B','C','D','E','F','G','H','J','K','M','N',
		'P','Q','R','S','T','U','V','W','X','Y','Z',
		'a','b','c','d','e','f','g','h','j','k','m','n',
		'p','q','r','s','t','u','v','w','x','y','z');
	for (let i = 0; i < codeLength; i++) {
		let charIndex = Math.floor(Math.random() * 54);
		code += selectChar[charIndex];
	}
	return code;
}

/**
 * 生成随机数
 * @param codeLength
 * @returns {string}
 */
const getCode = function (codeLength) {
	let code = ``;
	//所有候选组成验证码的字符，当然也可以用中文的
	let selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
		'A','B','C','D','E','F');
	for (let i = 0; i < codeLength; i++) {
		let charIndex = Math.floor(Math.random() * 16);
		code += selectChar[charIndex];
	}
	return code;
}

export {
	createCode, domain, getCode
}

