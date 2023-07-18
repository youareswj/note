// 有关栈的算法
const str = '2[1[a]3[b]2[3[c]4[d]]]';
function smartRepeat(str) {
	// 指针
	let index = 0;
	// 存放数字的栈
	let stackNum = [];
	// 存放临时字符串的栈
	let stackStr = [];
	// 字符串剩余部分
	let surplus = str;
	while (index<str.length-1){
		surplus = str.substring(index);
		console.log(index)
		if(/^\d+\[/.test(surplus)){    // 匹配重复次数
			let times = surplus.match(/(\d+)\[/)[1];
			// 数字和字符串分别压栈
			stackNum.push(times);
			stackStr.push('');
			// 移动指针,多加一因为匹配多了个‘[’
			index += times.length+1;  // 多位数字移动指针,用for循环不适合
			//console.log(stackNum,stackStr);
		}else if(/^\w+\]/.test(surplus)){  // 匹配要重复的字符串
			let repeatStr = surplus.match(/(\w+)\]/)[1];
			stackStr[stackStr.length-1] = repeatStr;
			index += repeatStr.length;
		}else if(surplus[0]===']'){
			// 字符串和数字分别弹栈
			let times = stackNum.pop();
			let str = stackStr.pop();
			stackStr[stackStr.length-1] += str.repeat(times);
			index ++;
		}
	}
	console.log(stackNum,stackStr);
}
smartRepeat(str);