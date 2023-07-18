/*
* 遍历器
* */
let obj = {
	name:'1',
	[Symbol.iterator](){
		const self = this;
		let index = 0;
		return{
			next(){
				const key = Object.keys(obj);
				if(index<key.length){
					return {
						value:obj[index++],
						done:false
					}
				}else{
					return{
						value: undefined,
						done: true
					}
				}
			}
		}
	}
}
