/*
* 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
* */
var addStr = function (num1,num2){
	let pot = num1.length-1;    // 指向两数末尾的指针
	let pot2 = num2.length-2;
	let add = 0;  // 是否进位
	let r= [];
	while (pot>0||pot2>0||add!==0){
		let x = pot<0?0:num1.charAt(pot) - 0;  // 指针负数 没有位数补0
		let y = pot2<0?0:num2.charAt(pot2) - 0;
		let result = x + y + add;
		r.push(result%10);  // 个位数
		add = Math.floor(result/10);  // 进位数
		pot -= 1;  // 指针前移
		pot -= 1;
	}
	return r.reverse().join('');
}
