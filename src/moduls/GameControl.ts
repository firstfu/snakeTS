/**
 * @ Author: firstfu
 * @ Create Time: 2022-01-09 17:56:17
 * @ Description: 遊戲控制類，控制其他的所有類
 */

import Snake from './Snake'
import Food from './Food'
import ScorePanel from './ScorePanel'

class GameControl {
  // 蛇
  snake: Snake
  // 食物
  food: Food
  // 記分牌
  scorePanel: ScorePanel
  // 用來記錄遊戲是否結束
  isLive: boolean = true

  // 創建一個屬性來存儲蛇的移動方法(也就是按鍵的方向)
  direction: string = ''

  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel()
    this.init()
  }

  // 遊戲初始化方法，調用後遊戲即開始
  init() {
    // 綁定鍵盤按鍵按下的事件
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    // 調用run方法: 使蛇移動
    this.run()
  }

  // 鍵盤按下的響應函數
  keydownHandler(e: KeyboardEvent) {
    // ArrowLeft
    // ArrowUp
    // ArrowRight
    // ArrowDown
    this.direction = e.key
  }

  // 創建控制移動的方法
  run() {
    // 獲取蛇現在的坐標
    let X = this.snake.X
    let Y = this.snake.Y

    // console.log('X:', X)
    // console.log('Y:', Y)

    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        Y -= 10
        break
      case 'ArrowDown':
      case 'Down':
        Y += 10
        break
      case 'ArrowLeft':
      case 'Left':
        X -= 10
        break
      case 'ArrowRight':
      case 'Right':
        X += 10
        break
    }

    // 檢查蛇是否吃到食物
    this.checkEat(X, Y)

    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (error: any) {
      alert(error.message)
      console.log(error.message)
      this.isLive = false
    }

    // 開始定時調用
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
  }

  // 蛇是否吃到食物
  private checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      // 食物的位置要重置
      this.food.change()
      // 分數增加
      this.scorePanel.addScore()
      this.snake.addBody()
    }
  }
}

export default GameControl
