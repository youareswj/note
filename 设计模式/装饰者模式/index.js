/*
* 在不改变原对象的基础上，通过对其进行包装扩展，使原有对象可以满足用户的更复杂需求，而不会影响从这个类中派生的其他对象
* 装饰类和被装饰类都只关心自身的核心业务，实现了解耦。常常会引入许多小对象，看起来比较相似，实际功能大相径庭，从而使得我们的应用程序架构变得复杂起来
* */
class Phone {
	constructor() {
	}
	create(){
		return '生成手机';
	}
}

class Decorator {
	constructor(phone){
		this.phone = phone;
	}
	create(){
		this.phone.create();
		this.createShell();
	}
	createShell(){
		return '生成手机壳'
	}
}

let ph = new Phone();
ph.create();
let dr = new Decorator(ph);
dr.create();
