/**
 * 游戏容器类，主要用于组织游戏的整个玩法流程
 * @param {*} container 地图容器
 */
function Game(container) {
  // 地图DOM父容器
  container = typeof container === 'string' ? document.querySelector(container) : container

  // 创建地图对象
  this.map = new Map(container)
  // 创建食物对象，与地图关联
  this.food = new Food(this.map)
  // 创建蛇对象，与地图关联
  this.snake = new Snake(this.map)
  // 地图中关联已创建的食物与蛇对象
  this.map.food = this.food
  this.map.snake = this.snake

  // 积分
  this.score = 0

  // 绑定事件
  this.addEventListener()
}

/**
 * 修改 Game.prototype 属性
 * 通常会在对象直接量中添加一个 constructor 属性，指向构造函数本身
 */
Game.prototype = {
  constructor: Game,

  /**
   * 开始游戏
   */
  startGame() {
    console.log('开始游戏...')
    this.timer = setInterval(() => {
      // 让贪吃蛇移动一步
      const eatFood = this.snake.move()
      /*
       * 判断是否超出地图的范围: 通过判断蛇头的坐标是否在地图范围内来完成
       */
      // 贪吃蛇蛇头节点
      const header = this.snake.body[0]
      // 判断是否吃到食物，吃到食物，则积累积分
      if (eatFood) { // 累加积分，渲染
        this.score += 10
        $('.score').innerHTML = this.score
      }
      
      // 假定超出地图范围
      let out = true
      if (header.x < 0) { // 左
        header.x = 0
        // TODO: 身体也得向后再退一步
      } else if (header.x >= this.map.cols) { // 右
        header.x = this.map.cols - 1
      } else if (header.y < 0) { // 顶
        header.y = 0
      } else if (header.y >= this.map.rows) { // 底
        header.y = this.map.rows - 1
      } else {
        out = false
      }
      // 重新渲染地图上的贪吃蛇
      this.snake.rerender()
      // 判断如果超出范围，则停止定时器
      if (out) {
        console.log('游戏结束')
        $('.game-over').style.display = 'block'
        clearInterval(this.timer)
      }
    }, 500)
  },

  /**
   * 暂停游戏
   */
  pauseGame() {
    console.log('暂停游戏...')
    clearInterval(this.timer)
  },

  /**
   * 保存游戏进度(保存到 localStorage 中)，要保存的数据有:
   * 贪吃蛇身体各坐标数据
   * 食物的坐标数据
   * 积分数据
   */
  saveProgress() {
    // 构建一个待保存数据的对象
    const progress = {
      snake: this.snake.body.map(part => {
        // 将当前遍历到元素进行复制
        const copy = { ...part }
        // 将复制后对象中的 el 属性删除
        delete copy.el
        // 将处理后的新对象返回
        return copy
      }),
      food: {
        x: this.food.x,
        y: this.food.y,
      },
      score: this.score,
    }
    // 将该对象数据保存到 localStorage 中
    localStorage.setItem('progress', JSON.stringify(progress))
  },

  /**
   * 重新渲染地图上的各对象及积分
   */
  rerender() {
    this.snake.rerender()
    this.food.render()
    $('.score').innerHTML = this.score
  },

  /**
   * 加载保存的游戏进度数据
   */
  loadProgress() {
    // 将本地存储 localStorage 中的数据读取到应用中
    const progress = JSON.parse(localStorage.getItem('progress'))
    // 如果有本地的数据，则还原各项
    if (progress) {
      // 在还原各项数据前，应该将地图上的已渲染的DOM元素清除
      this.snake.remove()
      this.food.remove()

      // 还原数据
      const {snake, food: {x, y}, score} = progress
      this.snake.body = snake
      this.food.x = x
      this.food.y = y
      this.score = score

      // 页面应该将游戏地图上的食物与贪吃蛇重新渲染
      this.rerender()
    }
  },

  /**
   * 添加事件监听
   */
  addEventListener() {
    // 点击开始按钮，启动游戏
    $('.start').addEventListener('click', () => this.startGame())
    // 暂停
    $('.pause').addEventListener('click', () => this.pauseGame())
    // 保存游戏进度
    $('.save').addEventListener('click', () => this.saveProgress())
    // 加载游戏进度
    $('.load').addEventListener('click', () => this.loadProgress())
  },
}