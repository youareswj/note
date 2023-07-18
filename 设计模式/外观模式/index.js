/*
* 为子系统的一组接口提供一个一致的界面，定义了一个高层接口，这个接口使子系统更加容易使用
*
* */
let addMyEvent = function (el, ev, fn) {
	if (el.addEventListener) {
		el.addEventListener(ev, fn, false)
	} else if (el.attachEvent) {
		el.attachEvent('on' + ev, fn)
	} else {
		el['on' + ev] = fn
	}
};
