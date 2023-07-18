/*
* diff
* 进行最小化更新需满足(vn1,vn2):
* 1 只比较同一个虚拟节点(vn1.sel==v2.sel&&vn1.key==v2.key)
* 2 只比较同一层级虚拟节点,跨层无效
* 3 diff算法四种命中查找(有顺序)-->①新前与旧前 ②新后与旧后 ③新后与旧前 ④新前与旧后 【新前】新的虚拟节点中所有没有处理的开头节点 【新后】新的虚拟节点中所有没有处理的最后一个节点
* 命中四种中的任何一种策略,其他策略就不再判断,而是开始移动指针直到这次命中结束,再执行下一种命中,如果四种命中都没有则需要进行循环查找
* 命中规则③,则将新前指向的节点,移动到旧后指向的节点之后
* 命中规则④,则将新前指向的节点,移动到旧前指向的节点之前
* 旧前-> h('li',{},'A')       新前->h('li',{},'A')
*       h('li',{},'B')            h('li',{},'B')
* 旧后-> h('li',{},'C')            h('li',{},'C')
*                            新后->h('li',{},'D')
* 命中循环方式: while(新前<=新后&&旧前<=旧后){}
* 旧节点先循环完,新节点中还有剩余节点(新前与新后指针间的节点),即需要添加的节点
* 新节点先循环玩,旧节点中还有剩余节点(旧前与旧后指针间的节点),即需要删除的节点
* 否则删除原节点,添加新节点
*  ------------> patch()
* |                ↓
* |     旧节点是虚拟节点还是DOM节点?---DOM节点--->将旧节点转换为虚拟节点
* |                ↓                                 ↓
*diff调用        虚拟节点 <----------------------------
*patch             ↓
*比较两个       是不是同一个虚拟节点?-------不是----->暴力删除旧节点,插入新节点
*节点               ↓
* |                是
* |                ↓
* |     新旧节点是不是完全相同?------是------>不做处理
* |                ↓
* |               不是
* |                ↓
* | 新节点text!==undefined?--是-->old.text === new.text?---是--->不做处理
* |                ↓                       ↓
* |      否(新节点有children)               否---> elm.innerText = new.text
* |                ↓
* |      老节点有没有children--没有(旧节点有text属性)-->清空旧节点text后将新节点children插入DOM
* |                ↓
* ------有(新老节点都有children,进行diff算法实现最小量更新)
*
*
* */
import vnode from './vnode'

// 判断节点是虚拟节点还是DOM节点
function checkDom(node) {
	return node.sel !== undefined
}

// 判断两个节点是否是同一个虚拟节点
function checkSame(v1, v2) {
	return v1.sel === v2.sel && v1.key === v2.key;
}
// 设置标签属性值
function setAttrVal(node,dom) {
	if(JSON.stringify(node.data)!=='{}'){
		for(let i in node.data){
			const attr = node.data[i];
			dom.setAttribute(i,attr);
		}
	}
}
// vnode=>DOM
function creatElement(vnode) {
	// 创建dom节点
	const dom = document.createElement(vnode.sel);
	if (vnode.text && (vnode.children === undefined || vnode.children.length === 0)) {
		// 插入DOM文本
		dom.innerText = vnode.text;
		// 设置属性
		setAttrVal(vnode,dom);
	}else if (vnode.children && vnode.children.length > 0) { // 遍历子节点
		for (let i = 0; i < vnode.children.length; i++) {
			//let lastItem = i==0?pivot:vnode.children[i-1];
			let item = vnode.children[i];
			if (item.sel) {
				// 返回子节点DOM
				let child = creatElement(item);
				dom.appendChild(child);
				// 设置属性
				setAttrVal(item,dom);
			}
		}
	}
	// 补充elm
	vnode.elm = dom;
	return dom;
}

// diff 最小量更新
function updateChildren(parentElm, oChildren, nChildren) {
	// 新前(节点)
	let newStartIdx = 0;
	let newStartNode = nChildren[newStartIdx];
	// 旧前(节点)
	let oldStartIdx = 0;
	let oldStartNode = oChildren[oldStartIdx];
	// 新后(节点)
	let newEndIdx = nChildren.length - 1;
	let newEndNode = nChildren[newEndIdx];
	// 旧后(节点)
	let oldEndIdx = oChildren.length - 1;
	let oldEndNode = oChildren[oldEndIdx];
	// 缓存key,用于未匹配循环
	let keyMap = null;
	//diff四种策略匹配
	while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
		console.log('diff');
		// 先判断节点是不是存在或是不是处理过置为undefined
		if(oldStartNode === null || oldStartNode === undefined){
			oldStartNode = oChildren[++oldStartIdx];
		}else if(oldEndNode === null || oldEndNode === undefined){
			oldEndNode = oChildren[--oldEndIdx];
		}else if(newStartNode === null || newStartNode === undefined){
			newStartNode = nChildren[++newStartIdx];
		}else if(newEndNode === null || newEndNode === undefined){
			newEndNode = nChildren[--newEndIdx];
		}else if (checkSame(newStartNode, oldStartNode)) {
			// 新前-旧前
			console.log('命中一');
			patchNode(oldStartNode, newStartNode);
			newStartNode = nChildren[++newStartIdx];    // ++先赋值再运算,即先移动新前指针
			oldStartNode = oChildren[++oldStartIdx];
		} else if (checkSame(newEndNode, oldEndNode)) {
			// 新后-旧后
			console.log('命中二');
			patchNode(oldEndNode, newEndNode);
			newEndNode = nChildren[--newEndIdx];
			oldEndNode = oChildren[--oldEndIdx];
		} else if (checkSame(newEndNode, oldStartNode)) {
			// 新后-旧前 如果是这种情况,则将当前节点移动到旧后之后
			console.log('命中三');
			patchNode(oldStartNode, newEndNode);
			parentElm.insertBefore(oldStartNode.elm, oldEndNode.elm.nextSibling); // 插入旧后的下一个节点之前即旧后之后
			newEndNode = nChildren[--newEndIdx];
			oldStartNode = oChildren[++oldStartIdx];
		} else if (checkSame(newStartNode, oldEndNode)) {
			// 新前-旧后 如果是这种情况,则将当前节点移动到旧前之前
			console.log('命中四');
			patchNode(oldEndNode, newStartNode);
			parentElm.insertBefore(oldEndNode.elm, oldStartNode.elm);
			newStartNode = nChildren[++newStartIdx];
			oldEndNode = oChildren[--oldEndIdx];
		} else {
			// 四种都不匹配则循环查找
			console.log('循环');
			if(!keyMap) {
				keyMap = {};
				for (let i = oldStartIdx; i <= oldEndIdx; i++) {
					const key = oChildren[i].key;
					if(key) keyMap[key] = i;
				}
				// 寻找当前项,在old中位置
				const oldInKey = keyMap[newStartNode.key];
				if(oldInKey === undefined){
					// 是全新项需要添加到老的未处理的节点之前
					parentElm.insertBefore(creatElement(newStartNode),oldStartNode.elm);
				}else{
					// 旧项,需要移动
					const elmToMove = oChildren[oldInKey];
					patchNode(elmToMove.elm,newStartNode.elm);
					// 将此项设置为undefined并移动到oldStartIndex之前
					oChildren[oldInKey] = undefined;
					parentElm.insertBefore(elmToMove,oChildren[oldStartIdx].elm);
				}
			}
			// 循环结束移动指针
			newStartNode = nChildren[++newStartIdx];
		}
	}
	console.log('end diff');
	if (newStartIdx > newEndIdx) {  // 新节点先循环结束,则旧节点剩余节点应删除
		// 是否有剩余节点
		if (oldStartIdx <= oldEndIdx) {
			for (let i = oldStartIdx; i <= oldEndIdx; i++) {
				if(oChildren[i]){
					parentElm.removeChild(oChildren[i].elm);
				}
				//parentElm.removeChild(parentElm.children[i]);
			}
		}
	} else {   // 旧节点先循环结束,则新节点剩余节点为新增元素
		// 是否有剩余节点
		if (newStartIdx <= newEndIdx) {
			// 不用appendChild是因为不一定是在结尾处添加
			for (let i = newStartIdx; i <= newEndIdx; i++) {
				// parentElm.appendChild(creatElement(nChildren[i]));
				parentElm.insertBefore(creatElement(nChildren[i]),oChildren[oldStartIdx].elm);
			}
		}
	}
}

// 对比两个节点,渲染DOM节点到页面
function patchNode(old, newVnode) {
	// 判断是否是同一个对象
	if (old === newVnode) return;
	// 判断新节点是否有text属性
	if (newVnode.text && (newVnode.children === undefined || newVnode.children.length === 0)) {
		if (newVnode.text !== old.text) {
			old.elm.innerText = newVnode.text;
		}
	} else {
		// 新节点没有text属性,有children
		// 判断老节点是否有children
		if (old.children && old.children.length > 0) {
			updateChildren(old.elm, old.children, newVnode.children);
		} else {
			// 老节点没有children,清空text添加children
			old.elm.innerHTML = '';
			// 遍历添加新节点
			for (let i = 0; i < newVnode.children.length; i++) {
				let child = newVnode.children[i];
				let childDom = creatElement(child);
				old.elm.appendChild(childDom);
			}
		}
	}
}

export default function (oldVnode, newVnode) {
	let old;
	if (!checkDom(oldVnode)) {
		old = vnode(oldVnode.tagName.toLowerCase(), {}, undefined, undefined, oldVnode);
	} else {
		old = oldVnode;
	}
	// 判断是不是同一个节点
	if (checkSame(old, newVnode)) {
		console.log('是相同节点');
		patchNode(old, newVnode);
	} else {
		console.log('不是同一个节点');
		let newElm = creatElement(newVnode);
		// 先插入新节点
		if (old.elm && newElm) {
			old.elm.parentNode.insertBefore(newElm, old.elm);
		}
		// 如果不是diff最小量更新,暴力删除旧节点
		old.elm.parentNode.removeChild(old.elm);
	}
}