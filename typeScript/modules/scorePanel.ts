// 记分牌
export default class ScorePanel {
	private score = 0; // 分数
	private level = 1; // 等级
	scoreEl: HTMLElement; // 分数dom
	levelEl: HTMLElement; // 等级dom
	levelMax: number; // 最大等级
	scoreUp: number; // 升级分数
	constructor(levelMax = 10, scoreUp = 10) {
		this.scoreEl = document.querySelector('#score');
		this.levelEl = document.querySelector('#level');
		this.levelMax = levelMax;
		this.scoreUp = scoreUp;
	}
	// 获取分数
	get currentScore(){
		return this.score;
	}
	// 获取等级
	get currentLevel(){
		return this.level;
	}
	// 加分
	addScore() {
		this.scoreEl.innerText = ++this.score + '';  // +''=>转换为string
		// 分数够了升级
		if (this.score % this.scoreUp === 0) {
			this.levelUp();
		}
	}

	// 升级
	levelUp() {
		if (this.level < this.levelMax) {
			this.levelEl.innerText = ++this.level + '';
		}
	}
}