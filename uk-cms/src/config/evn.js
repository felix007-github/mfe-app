/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 */
let baseUrl = '/api/';
switch (process.env.VUE_APP_REQUESTTYPE) {
	case 'dev':		//	dev环境
		baseUrl = '/api/';
		break;
	case 'test':	// 	test build环境
		baseUrl = '/api/';
		break;
	default: 		//	正常build环境
		break;
}
/**
 * 根据需要选取需要的headers；
 * @param {*} url 
 */
const checkingNeedToken = function (url) {
	let pathArr = [  //不需要token的接口列表
		"api/path",
	];
	return !pathArr.includes(url)
}
export {
	baseUrl,
	checkingNeedToken,
}