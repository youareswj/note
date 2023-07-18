import scanner from "./scanner";

// 清除空格和换行
function clear(str) {
	// 清除换行符
	str = str.replace(/\n/g,'');
	// 清除标签外的空格
	str = str.replace(/^\s*(<.*?>.*?<\/.*?>)\s*/g,'$1');
	return str
}

// 收集tokens
function collectTokens(templateStr) {
	let word;
	let tokens = [];
	const Scanner = new scanner(templateStr);
	while (Scanner.eos()) {
		word = clear(Scanner.scanUtil('{{'));
		if (word) {
			tokens.push(['text', word]);
		}
		Scanner.scan('{{');
		word = clear(Scanner.scanUtil('}}'));
		if (word) {
			if (word[0] === '#') {
				tokens.push(['#', word.substring(1)]);
			} else if (word[0] === '/') {
				tokens.push(['/', word.substring(1)]);
			} else {
				tokens.push(['name', word]);
			}
		}
		Scanner.scan('}}');
	}
	return tokens;
}

/*
* 折叠tokens
* 栈数据结构,后进先出
* */
function nestTokens(tokens) {
	// 结果数组
	let nested = [];
	// 使用栈的数据结构,来存放当前操作的tokens的子项
	let sections = [];
	// 收集器,引用类型值(import!!!),指向结果数组(collector值变化,nested也会跟随变化)
	let collector = nested;
	for (let i = 0; i < tokens.length; i++) {
		//当前操作项  eg:['#',arr]
		let token = tokens[i];
		switch (token[0]) {
			case '#': // 遇到#表示要入栈,并把collector指向当前项下标为2的子项,以便触发关联的nested和sections值变化
				// 压栈(入栈)
				sections.push(token);
				// 收集器收集token
				collector.push(token);
				// 当前项(arr)要添加子元素,创建一个位置,同时引起nested和sections同一个token值的变化
				token[2] = [];
				// 改变收集器指向
				collector = token[2];
				// collector = token[2] = [];
				break;
			case '/': //遇到'/'表示数组循环结束,要出栈并把结果给结果数组
				// 弹栈(出栈);
				sections.pop();
				// 将collector指回给上一级下标2的项,没有就是指回结果数组
				collector = sections.length >0?sections[sections.length - 1][2]:nested;
				break;
			default:
				// 其他匹配到的元素,往收集器添加,结果数组也会产生相应变化
				collector.push(token);
				break;
		}
	}
	return nested;
}

function parseTempToTokens(templateStr) {
	let tokens = collectTokens(templateStr);
	let nested = nestTokens(tokens);
	// 返回dom数据结构
	return nested
}

export default parseTempToTokens;