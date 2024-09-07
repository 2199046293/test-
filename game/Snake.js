/**
 * 方向
 */
const Direction = {
  LEFT: Symbol('left'),
  RIGHT: Symbol('right'),
  UP: Symbol('up'),
  DOWN: Symbol('down'),
}

/**
 * 蛇类
 */
class Snake {
  constructor(map) {
    this.map = map // 关联的地图对象
    this.body = [ // 完整蛇身体的数组表示
      {x: 6, y: 5, bgColor: 'red', zIndex: 999, el: null}, // 第一个元素作为头
      {x: 5, y: 5, bgColor: 'black', el: null},
      {x: 4, y: 5, bgColor: 'black', el: null},
      {x: 3, y: 5, bgColor: 'black', el: null}, // 最后一个元素作为尾
    ]
    this.direction = Direction.RIGHT // 前进方向

    this.render() // 初始渲染
    this.addEventListener() // 添加事件监听，以便更改前进方向
    // this.autoMove() // 自动移动
  }

  render() {
    /* 遍历蛇身数组，渲染每一节DOM元素 */
    this.body.forEach(part => {
      // 动态创建DOM元素
      const div = document.createElement('div')
      part.el = div
      // 设置样式
      css(div, {
        width: this.map.cellWidth,
        height: this.map.cellHeight,
        position: 'absolute',
        top: part.y * this.map.cellHeight,
        left: part.x * this.map.cellWidth,
        backgroundColor: part.bgColor,
        zIndex: part.zIndex ?? 1,
      })
      // 追加到地图上渲染
      this.map.el?.appendChild(div)
    })
  }

  // 在地图上移动一步
  move() {
    // 数组长度
    const len = this.body.length
    // 暂存一下复制的蛇尾元素
    const tail = {...this.body[len - 1]}
    // 蛇在移动时，从尾开始依次向前移动一个坐标位置
    for(let i = len - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x
      this.body[i].y = this.body[i - 1].y
    }
    // 蛇头单独处理，根据前进方向处理其坐标
    const header = this.body[0]
    switch(this.direction) {
      case Direction.RIGHT:
        header.x += 1
        break
      case Direction.LEFT:
        header.x -= 1
        break
      case Direction.UP:
        header.y -= 1
        break
      case Direction.DOWN:
        header.y += 1
    }

    // 判断是否吃到食物
    if(header.x === this.map.food.x && header.y === this.map.food.y) {
      // 吃到食物，在 body 中增加一节(添加一个元素)
      this.body.push(tail)
      // 删除已被吃掉的食物，重新再生成一个新的食物
      this.map.food.rerender()

      // 返回 boolean 值 true 表示吃到食物
      return true
    }

    // // 重新渲染
    // this.rerender()
  }

  // // 定时在地图上自动移动
  // autoMove() {
  //   this.timer = setInterval(() => this.move(), 300)
  // }

  /**
   * 清除已渲染DOM节点
   */
  remove() {
    /*
     * 先将已渲染的DOM节点移除
     */
    this.body.forEach(part => part.el?.remove())
  }

  /**
   * 重新渲染
   */
  rerender() {
    /*
     * 先将已渲染的DOM节点移除
     */
    this.body.forEach(part => part.el?.remove())
    // 再重新渲染
    this.render()
  }

  /**
   * 注册事件监听
   */
  addEventListener() {
    // 文档中添加按键事件，使用方向键改变蛇头前进方向
    document.addEventListener('keydown', event => {
      switch(event.key) {
        case 'ArrowLeft':
          this.direction = Direction.LEFT
          break
        case 'ArrowRight':
          this.direction = Direction.RIGHT
          break
        case 'ArrowUp':
          this.direction = Direction.UP
          break
        case 'ArrowDown':
          this.direction = Direction.DOWN
      }
    })
  }
}
