/*
* 防抖
* 频繁操作里n秒内只能执行一次
*
* */
// 不立即执行
function debounce(fn,wait){
	let timeout;
	return function (){
		let _this = this;
		let arg = arguments;
		if(timeout) clearTimeout(timeout);
		timeout = setTimeout(()=>{
			fn.apply(_this,arg);
		},wait)
	}
}
// 立即执行
function debounceRn(fn,wait){
	let timeout;
	return function (){
		let _this = this;
		let arg = arguments;
		if(timeout) clearTimeout(timeout);
		let rightNow = !timeout;
		timeout = setTimeout(()=>{
			timeout = null;
		},wait)
		if(rightNow) fn.apply(_this,arg);
	}
}
/*
* 节流
* 频繁事件n秒内只执行一次
* */
function throttle(fn,wait) {
	let flag = true;
	return function (){
		let _this = this;
		let arg = arguments;
		if(flag){
			fn.apply(_this,arg);
			flag = false;
			setTimeout(()=>{
				flag = true;
			},wait)
		}
	}
}
