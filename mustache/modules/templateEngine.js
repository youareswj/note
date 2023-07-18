import parseTempToTokens from './tokens';

class templateEngine {
	constructor(templateStr){
		this.templateStr = templateStr;
	}
	/*
	* render 渲染
	* */
	render(templateStr,data){
		let domTokens = parseTempToTokens(templateStr);
		let dom = this.renderData(domTokens,data);
		return dom;
	}
	/*
	* 解析keyName
	* */
	lookup(data,keyName){
		if(keyName.indexOf('.')!==-1&&keyName!=='.'){
			let temp = data;
			let keys = keyName.split('.');
			for(let i=0;i<keys.length;i++){
				temp = temp[keys[i]]
			}
			return temp
		}
		// 没有.
		return data[keyName];
	}
	/*
	* 解析token
	* */
	tokenAnalysis(token,data){
		const list = this.lookup(data,token[1]);
		let result = '';
		for(let i=0;i<list.length;i++){
			// 补充'.'属性 渲染{{.}}
			result += this.renderData(token[2],{
				'.':list[i],
				...list[i]
			});
		}
		return result;
	}

	/*
	* 将数据传入tokens数组,渲染
	* */
	renderData(tokens,data){
		// 结果
		let result = '';
		for(let i=0;i<tokens.length;i++){
			let token = tokens[i];
			if(token[0]==='text'){
				result += token[1];
			}else if(token[0]==='name'){
				result += this.lookup(data,token[1]);
			}else if (token[0]==='#'){
				result += this.tokenAnalysis(token,data);
			}
		}
		return result;
	}
}

export default templateEngine;