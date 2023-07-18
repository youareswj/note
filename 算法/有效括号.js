/*
* 给定一个只包括 '('，')'，'{'，'}'，'['，']'的字符串 s ，判断字符串是否有效。
* 有效字符串需满足：
*   左括号必须用相同类型的右括号闭合。
*   左括号必须以正确的顺序闭合。
*   每个右括号都有一个对应的相同类型的左括号。
* */
// 用栈数据机构,每个类型左括号入栈，遇到匹配的右括号，弹栈。直到循环结束。 栈内还有值就是无效字符串，字符串长度只能是偶数

// 创建符号键值对
const paris =  new Map([
		[')','('],
		[']','['],
		['}','{']
])
// 存放左符号的栈
let stk = [];
function isValid(s='()[]{{}]'){
	if(s.length%2!==0){  // 字符长度不能奇数
		return false;
	}
	for(let key of s){
		if(paris.has(key)){  // 遇到右符号
			if(stk.length === 0 || stk[stk.length-1]!==paris.get(key)){
				return false
			}else{
				stk.pop();  // 符号匹配成功 弹栈
			}
		}
		stk.push(key); // 左括号入栈
	}
	return !stk.length;
}
