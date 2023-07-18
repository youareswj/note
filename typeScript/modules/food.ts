// 食物类
export default class Food {
	el:HTMLElement;
	constructor(){
		this.el = document.querySelector('.food');
	}
	// 获取当前横坐标
	get X(){
		return this.el.offsetLeft;
	}
	// 获取当前纵坐标
	get Y(){
		return this.el.offsetTop;
	}
	// 生成随机位置
	randomPos(){
		// 生成整十的位置,因为蛇每次移动都是它的大小10px;
		let left = Math.round(Math.random()*28)*10;
		let top = Math.round(Math.random()*28)*10;
		this.el.style.left = `${left}px`;
		this.el.style.top = `${top}px`;
	}
}