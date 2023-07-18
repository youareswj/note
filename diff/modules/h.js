import vnode from './vnode'

function isStrOrNum(t) {
	return typeof t === 'string' || typeof t === 'number';
}
export default function (sel,b,c) {
  /*
  * 模式1:h('div',{},'text')
  * 模式2:h('div',{},[])
  * 模式3:h('div',{},h())
  * */
  if(isStrOrNum(c)){
  	return vnode(sel,b,undefined,c,undefined);
  }else if(typeof c === 'object' && c.length){
  	let children = [];
  	for(let i in c){
  		if(typeof c[i] === 'object' && c[i].sel){
  			children.push(c[i]);
		  }
	  }
  	return vnode(sel,b,children,undefined,undefined);
  }else if (typeof c === 'object' && c.sel){
  	return vnode(sel,b,[c],undefined,undefined);
  }
}