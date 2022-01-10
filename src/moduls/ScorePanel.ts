/**
 * @ Author: firstfu
 * @ Create Time: 2022-01-09 17:42:33
 * @ Description:  定義表示計分牌的類
 */

class ScorePanel {
  score = 0
  level = 1

  // 設置一個最大等級
  maxLevel: number
  // 設置多少分時升級
  upScore: number

  // 分數和等級所在的元素，在構造函數中進行初始化
  scoreEle: HTMLElement
  levelEle: HTMLElement

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  // 設置一個加分的方法
  addScore() {
    // 使分數自增
    this.scoreEle.innerHTML = ++this.score + ''
    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }

  // 提升等級的方法
  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + ''
    }
  }
}

export default ScorePanel
