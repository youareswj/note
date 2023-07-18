console.log('---server start---');
import h from './modules/h';
import patch from './modules/patch';

// const container = document.querySelector('#container');
const container = document.getElementById('container');
const btn = document.getElementById('patchIt');
const vnode1 = h('ul',{},[
		h('li',{key:'a'},'a'),
		h('li',{key:'b'},'b'),
		h('li',{key:'c'},'c'),
		h('li',{key:'d'},'d')
]);
const vnode2 = h('ul',{},[
	h('li',{key:'q'},'q'),
	h('li',{key:'d'},'d'),
	h('li',{key:'a'},'a'),
	h('li',{key:'a'},'a'),
	h('li',{key:'a'},'a'),
	h('li',{key:'c'},'c22'),
	h('li',{key:'b'},[
			h('a',{key:'text',href:'http://www.baidu.com'},'ppp')
	])
]);

patch(container,vnode1);

btn.onclick = function () {
	patch(vnode1,vnode2);
}



