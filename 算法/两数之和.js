/*
* 给定一个整数数组 nums和一个整数目标值 target，请你在该数组中找出 和为目标值 target的那两个整数，并返回它们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
* */
let nums = [2, 7, 11, 15];
let target = 9;

// 暴力枚举
function twoSum(nums,target) {
	for (let i = 0; i < nums.length; i++) {
		for(let j = i+1;j<nums.length;j++){
			if(nums[i]+nums[j] === target){
				return [i,j]
			}
		}
	}
}
// 哈希表
let hash = [];
function twoSum2(nums,target){
	for (let i=0;i<nums.length;i++){
		let r = target - nums[i];
		if(hash.indexOf(r) === -1){
			hash.push(nums[i]);
		}else{
			return [i,hash.indexOf(r)]
		}
	}
}
