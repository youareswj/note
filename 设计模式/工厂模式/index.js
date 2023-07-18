/*
* 定义一个创建对象的接口，并将实例化过程延迟到子类，使对象符合子类要求
* 适合用于不希望子系统和一个大对象存在强耦合关系
* 扩展性高新增产品只要维护工厂类，但一定程度上增加系统复杂度
* */
class Product{
	constructor(name){
		this.name = name;
	}
	init(){
		console.log(this.name)
	}
}

class Factory {
	constructor(){
		this.product = '';
	}
	create(name){
		this.product = new Product(name);
	}
}

let person = new Factory();
person.create('people');
person.product.init();
