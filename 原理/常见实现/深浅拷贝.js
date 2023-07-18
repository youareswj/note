/*
* 浅拷贝 只拷贝一层
* */
let obj = {
	name: "北极光之夜。",
	like: "aurora",
};
function cloneObj() {
	let newObj = {};
	// 方式一
	for(let i in obj){
		newObj[i] = obj[i]
	}
	// 方式二
	Object.keys(obj).forEach(key=>{
		newObj[key] = obj[key];
	});
	// 方式三
	for (let [key,value] of Object.entries(obj)){
		newObj[key] = value
	}
	return newObj;
}
/*
* 深拷贝
* */
function cloneObjTwo(obj) {
	let newObj;
	if(Array.isArray(obj)){
		newObj = [];
	}else{
		newObj = {};
	}
	for(let i in obj){
		if(obj[i]&&typeof obj[i] === 'object'){
			newObj[i] = cloneObjTwo(obj[i])
		}else{
			newObj[i] = obj[i];
		}
	}
	return newObj;
}
