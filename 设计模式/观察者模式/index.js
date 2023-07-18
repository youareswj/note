class Watch{
	constructor(){
		this.subs = [];  // 订阅者
	}
	listen(fn){   // 订阅
		this.subs.push(fn);
	}
	notify(){  // 发布
		this.subs.forEach(p=>{
			p.apply(this,arguments);
		})
	}
}
