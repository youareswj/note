class scanner {
	/*
* scanner 扫描器
* */
	constructor(templateStr){
		this.templateStr = templateStr;
		// 指针
		this.pos = 0;
		// 扫描尾巴
		this.tail = templateStr;
	}
	// 判断指针是否结束
	eos (){
		return this.pos < this.templateStr.length;
	}
	// 跳过{{
	scan(tag){
		if(this.tail.indexOf(tag)==0){
			this.pos += tag.length;
			this.tail = this.templateStr.substring(this.pos);
		}
	}
	//扫描字符串,直到匹配结束,并返回结束时的字符串
	scanUtil(flag){
		// 记录开始值
		const pos_bak = this.pos;
		while (this.eos()&&this.tail.indexOf(flag)!=0){ // 等于0表示尾巴以{{开头
			// 指针后移
			this.pos++;
			this.tail = this.templateStr.substring(this.pos);
		}
		// 匹配到停止符({{)
		return this.templateStr.substring(pos_bak,this.pos);
	}
}

export default scanner;