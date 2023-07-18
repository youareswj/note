/*
* 一个类只有一个实例，并提供一个访问它的全局访问点
* 只实例化一次，便于维护。减少全局变量，但不利于单元测试。
* */
class login{
	constructor(){

	}
	show(){
		console.log('登录成功');
	}
}

login.getInstance = (function () {
	let instance;
	return function () {
		if(!instance){
			instance = new login();
		}
		return instance;
	}
})();

let o1 = login.getInstance();
let o2 = login.getInstance();

o1 === o2
