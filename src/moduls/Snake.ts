/**
 * @ Author: firstfu
 * @ Create Time: 2022-01-09 17:23:04
 * @ Description: 定義蛇類
 */

class Snake {
  // 表示蛇的頭
  head: HTMLElement
  // 表示蛇的身體
  bodies: HTMLCollection
  // 獲取蛇的容器
  element: HTMLElement

  constructor() {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div')! as HTMLElement
    this.bodies = document.getElementById('snake')!.getElementsByTagName('div')!
  }

  // 獲取蛇的坐標(蛇頭坐標)
  get X() {
    return this.head.offsetLeft
  }
  get Y() {
    return this.head.offsetTop
  }

  // 設置蛇的坐標(蛇頭坐標)
  set X(value) {
    // 如果新值和舊值相同，則直接返回不再修改
    if (this.X === value) {
      return
    }
    // 判斷值的合法範圍: 0~290之間
    if (value < 0 || value > 290) {
      // 進入判斷說明蛇撞牆了
      throw new Error('蛇撞牆了!')
    }

    // 修改X時，是在修改水平坐標，蛇在左右移動，蛇在向左移動，不能向右掉頭，反之亦然
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      console.log('水平方向發生掉頭')
      // 如果發生了掉頭，讓蛇向反方向繼續移動
      if (value > this.X) {
        // 如果新值value大於舊值X，則說明蛇在向右走，此時發生掉頭，應該使蛇繼續向左走
        value = this.X - 10
      } else {
        // 繼續向右走
        value = this.X + 10
      }
    }

    // 移動身體
    this.moveBody()
    this.head.style.left = value + 'px'
    this.checkHeadBody()
  }
  set Y(value) {
    // 如果新值和舊值相同，則直接返回不再修改
    if (this.Y === value) {
      return
    }
    if (value < 0 || value > 290) {
      // 進入判斷說明蛇撞牆了
      throw new Error('蛇撞牆了!')
    }

    // 修改Y時，是在修改垂直坐標，蛇在上下移動，蛇在向上移動，不能向下掉頭，反之亦然
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      console.log('垂直方向發生掉頭')
      // 如果發生了掉頭，讓蛇向反方向繼續移動
      if (value > this.Y) {
        value = this.Y - 10
      } else {
        value = this.Y + 10
      }
    }

    // 移動身體
    this.moveBody()
    this.head.style.top = value + 'px'
    this.checkHeadBody()
  }

  // 增加蛇身體的方法
  addBody() {
    // 向element中添加一個div
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }

  // 增加一個蛇身體移動的方法
  moveBody() {
    // 將後邊的身體設置為前邊身體的位置
    // 第4節 = 第3節的位置
    // 第3節 = 第2節的位置
    // 遍歷獲取所有的身體
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 獲取前邊身體的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop

      // 將值設置到當前身體
      ;(this.bodies[i] as HTMLElement).style.left = X + 'px'
      ;(this.bodies[i] as HTMLElement).style.top = Y + 'px'
    }
  }

  // 檢測蛇頭是否碰撞到身體
  checkHeadBody() {
    // 獲取所有的身體，檢查其是否和蛇頭的坐標發生重疊
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        // 蛇頭撞到了身體
        throw new Error('撞到自己了')
      }
    }
  }
}

export default Snake
