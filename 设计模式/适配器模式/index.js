/*
* 将一个类的接口转化为另外一个接口，以满足用户需求，使类之间接口不兼容问题通过适配器得以解决
* 提高类的复用。创建新对象非调用用存在一定开销。
* */
class Plug{
	constructor(){

	}
	getName(){
		return '苹果充电头'
	}
}

class Target{
	constructor(){
		this.plug = new Plug();
	}
	getName(){
		return this.plug.getName() + '适配Type-c';
	}
}

let tar = new Target();
tar.getName();
