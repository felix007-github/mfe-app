import { Message } from 'element-ui' //element Toast的提示
/**
 * 消息提示框
 * @param {消息} msg 
 * @param {消息的类型} type 
 */
export const alertMessage = function (msg, type) {
	Message({
		message: msg,
		center: true,
		type: type ? type : 'success',
		customClass: "message-success",
		duration: 2 * 1000
	})
};
/**
 * 去掉字符串的空格
 */
export const Trim = (str) => {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 存储localStorage
 * @param {名字} name 
 * @param {储存的内容} content 
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 * @param {名字} name 
 */
export const getStore = name => {
	if (!name) return false;
	return JSON.parse(window.localStorage.getItem(name));
}

/**
 * @param {名字} name
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}
/**
 * 检查图片的大小
 * @param {图片} img 
 */
export const checkImgSize = (img) => {
	let suffixArr = ['png', 'jpg', 'jpeg', 'png', 'gif']
	let size = img.size / (1024 * 1024)
	let suffix = /\.\w+$/.exec(img.name)[0].replace(/^\./, '');
	if (!suffixArr.includes(suffix.toLocaleLowerCase())) {
		alert('只支持gif,jpg,png格式')
		return false
	} else if (size > 5) {
		alert('图片不可大于5M')
		return false
	}
}
/**
 * 检查pdf或者图片
 * @param {图片} img 
 */
export const checkImgOrPdf = (img) => {
	let suffixArr = ['png', 'pdf', 'jpeg', 'jpg']
	let suffix = /\.\w+$/.exec(img.name)[0].replace(/^\./, '');
	if (!suffixArr.includes(suffix.toLocaleLowerCase())) {
		alert('只支持pdf,jpg,png,jpeg格式')
		return false
	} else {
		return true;
	}
}
/**
 * 验证是否为Excel表格
 * @param {表格} file 
 */
export const checkExcle = (file) => {
	let suffixArr = ['xls', 'xlsx']
	let suffix = /\.\w+$/.exec(file.name)[0].replace(/^\./, '');
	if (!suffixArr.includes(suffix.toLocaleLowerCase())) {
		alert('只支持xls,xlsx格式')
		return false
	} else {
		return true;
	}
}
/**
 * 检查电话号码
 * @param {*} phone 
 */
export const checkPhonenum = (phone) => {
	return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(phone)
}
/**
 * 拼接对象为请求字符串
 * @param {Object} obj - 待拼接的对象
 */
export function urlencode(obj) {
	const params = []
	Object.keys(obj).forEach((key) => {
		let value = obj[key]
		// 如果值为undefined我们将其置空
		if (typeof value === 'undefined') {
			value = ''
		}
		params.push([key, encodeURIComponent(value)].join('='))
	})
	return params.join('&')
}
/**
 * 千分位显示数值
 * @param {*} value 
 */
export const numFormat = function (value) {
	if (!value) {
		return "0.00"
	}
	value = value.toFixed(2);
	var intPart = Math.trunc(value);
	var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")
	var floatPart = ".00";
	var value2Array = value.split('.');
	if (value2Array.length === 2) {
		floatPart = value2Array[1].toString();
		if (floatPart.length === 1) {
			return intPartFormat + '.' + floatPart + '0';
		} else {
			return intPartFormat + '.' + floatPart;
		}
	} else {
		return intPartFormat + floatPart;
	}
}

/**
 * 多维度数组转化为一级数组；
 * @param {*} arrs 
 */
export let classAarray = function (arrs) {
	var oldArr = arrs;
	var newArr = [];
	function funarr(arr) {
		for (var i = 0; i < arr.length; i++) {
			if (Array.isArray(arr[i])) {
				funarr(arr[i])
			} else {
				newArr.push(arr[i])
			}
		}
	}
	funarr(oldArr);
	return newArr;
}
/**
 * @param {*} res 文件流
 * @param {*} name 文件名称
 */
export let exportFile = (res, name = 'name') => {
	const content = res
	const blob = new Blob([content])
	const fileName = `${name}-${moment(new Date()).format('YYYY-MM')}.xlsx`;
	if ('download' in document.createElement('a')) { // 非IE下载
	  const elink = document.createElement('a')
	  elink.download = fileName
	  elink.style.display = 'none'
	  elink.href = URL.createObjectURL(blob)
	  document.body.appendChild(elink)
	  elink.click()
	  URL.revokeObjectURL(elink.href) // 释放URL 对象
	  document.body.removeChild(elink)
	} else { // IE10+下载
	  navigator.msSaveBlob(blob, fileName)
	}
}
/**
 * 将数据转化为fromData
 * @param {数据参数} data 
 */
export let fromDataTrim = function (data) {
	var formData = new FormData();
	for (var key in data) {
		formData.append(key, data[key]);
	}
	return formData
};
/**
 * axios捕错
 * @param {*} code 
 * @param {*} response 
 */
export const throwErr = (code, response) => {
	code = Number(code)
	let message = '请求错误'
	switch (code) {
		case 400:
			message = '请求错误'
			break
		case 401:
			message = '未授权，请登录'
			break
		case 403:
			message = '拒绝访问'
			break
		case 404:
			message = `请求地址出错: ${response.config.url}`
			break
		case 408:
			message = '请求超时'
			break
		case 500:
			message = '服务器内部错误'
			break
		case 501:
			message = '服务未实现'
			break
		case 502:
			message = '网关错误'
			break
		case 503:
			message = '服务不可用'
			break
		case 504:
			message = '网关超时'
			break
		case 505:
			message = 'HTTP版本不受支持'
			break
		default:
			message = false;
			break;
	}
	return message;
}