// fun.call(thisObj,arg1,arg2,arg3)
function call(content=window) {
	// 未传第一个参数 默认未window对象
	// 函数本身 say.call();  fn = say();
	content.fn = this;
	let args = arguments.slice(1);
	let result = content.fn(...args);
	delete content.fn;
	return result;
}
//  fun.apply(thisObj,[args])
function apply(content=window) {
	content.fn = this;
	let result;
	if(arguments[1]){
		result = content.fn(...arguments[1]);
	}else{
		result = content.fn();
	}
	delete content.fn;
	return result;
}
// fun.bind(this,args)
function bind(content) {
	if(typeof this != 'function') {
		throw Error('not a function');
	}
	let _this = this;
	let args = [...arguments].slice(1);
	return function F() {
		// 判断是否被当做构造函数使用
		if(this instanceof F) {
			return _this.apply(this, args.concat([...arguments]))
		}
		return _this.apply(content, args.concat([...arguments]))
	}
}
/*
* new 实现
* Con 构造函数
* */
function createNew(Con,...args) {
	let obj = {};
	Object.setPrototypeOf(obj,Con);
	// obj.__proto__ = Con.prototype;
	let result = Con.apply(obj,args);
	return result instanceof Object ? result:obj;
}
// obj instanceof Object
function MyInstanceof(left,right) {
	let pro = left.__proto__;
	let pty = right.prototype;
	while (true){
		if(pro === null) return false;
		if(pro === pty) return true;
		pro = pro.__proto__;
	}
}
