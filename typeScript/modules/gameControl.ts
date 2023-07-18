import Food from './food';
import ScorePanel from './scorePanel';
import Snake from './snake';

export default class GameControl {
	snake: Snake;
	scorePanel: ScorePanel;
	food: Food;
	// 运动方向
	direction: string = '';
	// 游戏是否结束
	gameOver = false;

	constructor() {
		this.snake = new Snake();
		this.food = new Food();
		this.scorePanel = new ScorePanel(10,1);
		this.init();
	}

	//初始化
	init() {
		document.addEventListener('keydown', event => {
			this.keyDownHandle(event)
		});
		// document.addEventListener('keydown',this.keyDownHandle.bind(this));
		this.move();
	}

	// 按键响应事件
	keyDownHandle(event: KeyboardEvent) {
		// 检查按键值
		const up = (event.key === 'ArrowUp' || event.key === 'Up' || event.key === 'w') ? 'up' : '';
		const right = (event.key === 'ArrowRight' || event.key === 'Right' || event.key === 'd') ? 'right' : '';
		const down = (event.key === 'ArrowDown' || event.key === 'Down' || event.key === 's') ? 'down' : '';
		const left = (event.key === 'ArrowLeft' || event.key === 'Left' || event.key === 'a') ? 'left' : '';
		if (up || right || down || left) {
			this.direction = up || right || down || left;
		} else {
			console.log('错误按键');
		}
	}

	// 移动
	move() {
		// 获取蛇坐标
		let x = this.snake.X;
		let y = this.snake.Y;
		// 根据方向移动
		switch (this.direction) {
			case 'up':
				y -= 10;
				break;
			case 'down':
				y += 10;
				break;
			case 'left':
				x -= 10;
				break;
			case 'right':
				x += 10;
				break;
		}
		// 吃到食物
		if(this.cheackEat(x,y)){
			// 改变位置
			this.food.randomPos();
			// 加分
			this.scorePanel.addScore();
			// 增加长度
			this.snake.snakeAdd();
		}
		// 移动
		try {
			this.snake.X = x;
			this.snake.Y = y;
		}catch (e) {
			this.gameOver = true;
			alert(e.message);
		}

		// 定时调用
		!this.gameOver && setTimeout(() => {
			this.move()
		}, 300 - (this.scorePanel.currentLevel - 1) * 30);
	}
	// 验证是否迟到食物了
	cheackEat(x,y){
		if(x===this.food.X&&y===this.food.Y){
			return true;
		}else{
			return false;
		}
	}
}