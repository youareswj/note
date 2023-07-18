export default class Snake {
	// 蛇容器
	snake: HTMLElement;
	// 蛇头
	head: HTMLElement;
	// 蛇身
	body: HTMLCollection;
	constructor() {
		this.snake = document.querySelector('.snake');
		this.head = document.querySelector('.snake>div');
		this.body = document.getElementById('snake').getElementsByTagName('div');
	}

	// 获取蛇坐标
	get X() {
		return this.head.offsetLeft;
	}

	get Y() {
		return this.head.offsetTop;
	}

	// 设置蛇坐标
	set X(val: number) {
		if (this.X === val) {
			return;
		} else if (val >= 0 && val < 290) {
			// 水平将要移动的值等于蛇第二节的位置即试图反方向运动
			if (this.body[1] && (this.body[1] as HTMLElement).offsetLeft === val) {
				// val小于蛇头位置即想往左走
				if (val < this.X) {
					// 改变方向继续往右
					val = this.X + 10;
				} else {
					val = this.X - 10;
				}
			}
			// 移动
			this.moveBody();
			this.head.style.left = `${val}px`;
			this.checkStrike();
		} else {
			throw new Error('撞墙了')
		}
	}

	set Y(val: number) {
		if (this.Y === val) {
			return;
		} else if (val >= 0 && val < 290) {
			// 垂直将要移动的值等于蛇第二节的位置即试图反方向运动
			if (this.body[1] && (this.body[1] as HTMLElement).offsetTop === val) {
				// val小于蛇头位置即想往左走
				if (val < this.Y) {
					// 改变方向继续往右
					val = this.Y + 10;
				} else {
					val = this.Y - 10;
				}
			}
			// 移动
			this.moveBody();
			this.head.style.top = `${val}px`;
			this.checkStrike();
		} else {
			throw new Error('撞墙了')
		}
	}

	// 增加蛇长度
	snakeAdd() {
		this.snake.insertAdjacentHTML('beforeend', '<div></div>');
	}

	// 移动身体坐标
	moveBody() {
		for (let i = this.body.length - 1; i > 0; i--) {
			let prevX = (this.body[i - 1] as HTMLElement).style.left;
			let prevY = (this.body[i - 1] as HTMLElement).style.top;
			// 将后一节的位置赋值给前一节即移动整节身体
			(this.body[i] as HTMLElement).style.left = prevX;
			(this.body[i] as HTMLElement).style.top = prevY;
		}
	}
	// 检查是否撞到自己
	checkStrike(){
		for(let i=1;i<this.body.length;i++){
			let bd = this.body[i] as HTMLElement;
			if(this.X===bd.offsetLeft&&this.Y===bd.offsetTop){
				throw new Error('撞到自己了');
			}
		}
	}
}