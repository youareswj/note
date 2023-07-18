import {Watcher,Observer} from "./observer";

const compileUtil = {
	text(node,expr,vm){ //节点 属性名 vm对象
		let value;
		if(expr.indexOf('{{')!==-1){  //渲染{{msg}}-{{}}
			value = expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
				new Watcher(args[1],vm,()=>{
					this.updater.textUpdate(node,this.getContentVal(expr,vm))
				});
				return this.getVal(args[1],vm);
			});
		}else{ //渲染v-text="msg"
			value = this.getVal(expr,vm);
			new Watcher(expr,vm,(newVal)=>{
				this.updater.textUpdate(node,newVal);
			});
		}
		this.updater.textUpdate(node,value);
	},
	html(node,expr,vm){
		const value = this.getVal(expr,vm);
		new Watcher(expr,vm,(newVal)=>{
			this.updater.htmlUpdate(node,newVal);
		});
		this.updater.htmlUpdate(node,value);
	},
	model(node,expr,vm){
		const value = this.getVal(expr,vm);
		new Watcher(expr,vm,(newVal)=>{
			this.updater.modelUpdate(node,newVal);
		});
		// 双向绑定
		node.addEventListener('input',(e)=>{
			this.setVal(expr,vm,e.target.value);
		});
		this.updater.modelUpdate(node,value);
	},
	on(node,expr,vm,event){
		let fn = vm.$option.methods&&vm.$option.methods[expr];
		node.addEventListener(event,fn.bind(vm),false);
	},
	bind(node,expr,vm,attrName){
		node.setAttribute(attrName,expr);
	},
	getContentVal(expr,vm){
		return expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
			return this.getVal(args[1],vm);
		});
	},
	getVal(expr,vm){ // expr可能只是msg,或者是多重person.name
		const value = expr.split('.').reduce((data,current)=>{
			return data[current];
		},vm.$data);
		return value;
	},
	// 双向绑定数据
	setVal(expr,vm,inputVal){
		expr.split('.').reduce((data,current,index,arr)=>{
			// 取得最后值才进行赋值
			if(index==arr.length-1){
				data[current] = inputVal;
			}
			return data[current];
		},vm.$data);
	},
	updater:{
		textUpdate(node,val){
			node.textContent = val;
		},
		htmlUpdate(node,val){
			node.innerHTML = val;
		},
		modelUpdate(node,val){
			node.value = val;
		}
	}
};
class Compile {
	constructor(el,vm) {
		this.el = this.isElementNode(el) ? el : document.querySelector(el);
		this.vm = vm;
		// 创建文档碎片存放html,来减少编译节点时页面的回流和重绘
		const fragment = this.node2Fragment(this.el);
		// 编译模板
		this.compile(fragment);
		// 追加子元素到根元素
		this.el.appendChild(fragment);
	}

	isElementNode(node) {
		return node.nodeType === 1;
	}

	node2Fragment(el) {
		const f = document.createDocumentFragment();
		let firstChild;
		while (firstChild = el.firstChild) { // appendChild会将原来的dom节点添加到虚拟dom树并删除原来dom节点
			f.appendChild(firstChild);
		}
		return f;
	}

	compile(fragment) {
		//获取子节点
		const nodes = fragment.childNodes;
		[...nodes].forEach(child => {
			if (this.isElementNode(child)) {   // 编译元素节点
				this.compileElement(child)
			} else { // 编译文本节点
				this.compileText(child);
			}
			// 递归循环所有子节点
			if (child.childNodes && child.childNodes.length) {
				this.compile(child)
			}
		})
	}
	// 节点渲染
	compileElement(node){
		const nodeAttributes = node.attributes;
		[...nodeAttributes].forEach(item=>{
			const {name,value} = item; // name/value指绑定在元素上的自定义属性名/值 v-text="msg"
			if(this.isDirective(name)){
				const [,directive] = name.split('-');  // v-bind:src
				const [directiveName,event] = directive.split(':'); //v-on:click
				// 更新数据
				compileUtil[directiveName](node,value,this.vm,event);
				// 删除标签上指令
				if(event){
					node.removeAttribute('v-'+directiveName+':'+event);
				}else{
					node.removeAttribute('v-'+directiveName);
				}
			}else if(this.isClickEvent(name)){
				let [,eventName] = name.split('@');
				compileUtil['on'](node,value,this.vm,eventName);
				// 删除标签上指令
				node.removeAttribute('@'+eventName);
			}else if(this.isBindEvent(name)){
				let [,eventName] = name.split(':');
				compileUtil['bind'](node,value,this.vm,eventName);
				node.removeAttribute(':'+eventName);
			}
		})
	}
	// 文本渲染
	compileText(node){
		const text = node.textContent;
		if(/\{\{(.+?)\}\}/.test(text)){
			compileUtil['text'](node,text,this.vm);
		}
	}
	// 判断是否指令,过滤原生属性(class等)
	isDirective(attrName){
		return attrName.startsWith('v-');
	}
	// 判断@
	isClickEvent(eventName){
		return eventName.startsWith('@');
	}
	// 判断:
	isBindEvent(eventName){
		return eventName.startsWith(':');
	}
}
class Vue {
	constructor(options) {
		this.$el = options.el;
		this.$data = options.data;
		this.$option = options;
		if (this.$el) {
			// 劫持数据 观察数据
			new Observer(this.$data);
			// 编译器
			new Compile(this.$el, this);
			// 代理data this.$data.person=>this.person
			this.proxyData(this.$data);
		}
	}
	proxyData(data){
		for(let i in data){
			Object.defineProperty(this,i,{
				get(){
					return data[i];
				},
				set(n){
					data[i] = n;
				}
			})
		}
	}
}

export {
	compileUtil,
	Compile,
	Vue
}

