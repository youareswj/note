// import {arrayMethods} from "../vue-2.6/vue-2.6/src/core/observer/array";
import {compileUtil} from "./vue";
import {arrayMethods} from "./array.js";

// 数据观察者
class Watcher {
	constructor(expr,vm,cb){
		this.expr = expr;
		this.vm = vm;
		this.cb = cb;
		// 将旧值保存起来
		this.oldVal = this.getOldVal(this.expr,this.vm);
	}
	// 获取旧值
	getOldVal(expr,vm){
		Dep.target = this; // 观察者关联依赖收集器
		let oldVal = compileUtil.getVal(expr,vm); // 获取旧值后触发Observer里的get往Dep添加watcher
		Dep.target = null; // 防止重复添加观察者
		return oldVal;
	}
	// 更新数据变化
	update(){
		let newVal = compileUtil.getVal(this.expr,this.vm);
		if(newVal !== this.oldVal){
			this.cb(newVal); // 值发生了变化,调用回调函数
		}
	}
}
// 依赖收集器
class Dep {
	constructor(){
		this.subs = [];
	}
	// 添加数据观察者
	addSub(watcher){
		this.subs.push(watcher);
	}
	// 数据变化通知观察者更新视图
	notify(){
		this.subs.forEach(w=>w.update());
	}
}

class Observer {
	constructor(data){
		this.dep = new Dep();
		this.observer(data);
	}
	observer(data){
		if(typeof data === 'object'&&typeof data.__ob__ === 'undefined'){
			Object.defineProperty(data,'__ob__',{
				enumerable:false,
				value: this
			});
		}
		// 判断是不是数组
		if(Array.isArray(data)){
			// 将数组的原型强制指向arrayMethods,以调用改写后的方法
			Object.setPrototypeOf(data,arrayMethods);
			this.defineArrayProperty(data);
		}else{
			if(data && typeof data === 'object'){
				Object.keys(data).forEach(key=>{
					this.defineProperty(data,key,data[key]);
				})
			}
		}
	}
	// 劫持数据
	defineProperty(obj,key,value){
		// 递归遍历
		this.observer(value);
		const dep = new Dep();
		Object.defineProperty(obj,key,{
			enumerable:true,
			get() {
				// 添加观察者
				Dep.target && dep.addSub(Dep.target);
				return value;
			},
			set:(v)=> {
				if(v !== value){
					this.observer(v); // 继续劫持新值
					value = v;
				}
				// 向依赖器通知
				dep.notify();
			}
		})
	}
	// 劫持数组
	defineArrayProperty(arr){
		for(let i=0,l=arr.length;i<l;i++){
			let itemArr = arr[i];
			this.observer(itemArr);
		}
	}
}

export {Watcher,Dep,Observer}