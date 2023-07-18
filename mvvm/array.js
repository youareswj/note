/*
* 数组响应式原理:
* 改写了数组的七种方法
* push
* pop
* shift
* unshift
* sort
* reverse
* 以Array.prototype为原型创建了arrayMethods,然后将data里的数组的原型指向arrayMethods
* */
// 获取Array.prototype
const arrayPrototype = Array.prototype;
// 以Array.prototype为原型创建了arrayMethods
export const arrayMethods = Object.create(arrayPrototype);
const methodsChanged = ['push','pop','shift','unshift','sort','reverse','splice'];
methodsChanged.forEach(method=>{
	// 备份原方法
	const original = arrayPrototype[method];
	// 改写添加响应式
	Object.defineProperty(arrayMethods,method,{
		enumerable:false,
		// 改写方法所以value值是一个函数
		value:function () {
			console.log(`${method}被改写了`);
			/*
			* data(){
			*   a:[1,2,3]
			* }
			* a.push(4)  此时的apply里的this即为实例a
			* */
			// 先执行原方法的功能,apply改变this指针为当前调用此method的实例
			const result = original.apply(this,arguments);
			// arguments是类数组对象,将它转成数组
			const args = [...arguments];
			const ob = this.__ob__;
			let addArr = [];
			// 这三个方法会添加数组新项
			switch (method) {
				case 'push':
				case'unshift':
					addArr = args;
					break;
				case 'splice':
					// splice(下标,数量,插入的新项)
					addArr = args.slice(2);
					break;
				default:
					break;
			}
			if(addArr.length) ob.defineArrayProperty(addArr);
			return result;
		}
	})
});