function arithmetic(num,precision=4){
	num += '';
	if(num.indexOf('.')>-1&&num.split('.')[1].length>8){
		let result = Math.round(+num+'e'+precision) / Math.pow(10,precision);
		if(isNaN(result)) result = '';
		return result;
	}else{
		return +num;
	}
}
