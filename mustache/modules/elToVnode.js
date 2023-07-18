class elToVnode{
	constructor(el){
		this.$el = el;
	}
	createFragment(el){
		const elm = el.nodeType===1?el:document.querySelector(el);
		let vnode = [];
		[...elm.childNodes].forEach(item=>{
			if(item.nodeType===1){
				vnode.push(this.transformVnode(item));
			}
		})
		console.log([...elm.childNodes])
	}
	transformVnode(node){
		let vnode = {
			sel:'',
			data:{},
			key:'',
			children:[],
			text:'',
			elm:null
		};
		// 设置选择器
		vnode.sel = node.tagName.toLowerCase();
		// 设置data属性
		[...node.attributes].forEach(attr=>{
			let attrObj = {};
			let key = attr.nodeName;
			let val = attr.value;
			attrObj[val] = true;
			vnode.data[key] = attrObj;
		});
		// 设置标签内容
		if(node.children.length===0){
			vnode.text = node.innerText;
		}
		// 设置children
		if(node.children.length>0){
			for(let i=0;i<node.children.length;i++){
				vnode.children.push(this.transformVnode(node.children[i]));
			}
		}
		return vnode;
	}
}
export default elToVnode;