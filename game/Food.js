/**
 * 食物类
 */
class Food {
  /**
   * 构造函数
   * @param {*} map 
   * @param {*} bgColor 
   */
  constructor(map, bgColor = 'green') {
    this.map = map // 地图引用
    this.x = 0 // 食物在地图上显示的 x 坐标
    this.y = 0 // 食物在地图上显示的 y 坐标
    this.bgColor = bgColor // 食物渲染的背景颜色

    this.el = null // 保存食物渲染的 DOM 元素

    // 渲染页面显示的食物节点
    this.render()
  }

  /**
   * 生成食物的随机坐标
   */
  generateCoordinate() {
    // 地图上 x/y 坐标最大取值
    const maxX = Math.floor(this.map.width / this.map.cellWidth)
    const maxY = Math.floor(this.map.height / this.map.cellHeight)
    // 在 0-maxX/maxY 的范围内取随机坐标
    this.x = Math.floor(Math.random() * maxX)
    this.y = Math.floor(Math.random() * maxY)

    return {
      x: this.x,
      y: this.y,
    }
  }

  /**
   * 渲染食物
   */
  render() {
    // 创建食物在页面渲染的元素
    const div = document.createElement('div')
    this.el = div
    // 设置 css 样式
    css(div, {
      position: 'absolute',
      left: this.x * this.map.cellWidth,
      top: this.y * this.map.cellHeight,
      width: this.map.cellWidth,
      height: this.map.cellHeight,
      backgroundColor: this.bgColor,
    })
    // 添加到地图上渲染
    this.map.el?.appendChild(div)
  }

  remove() {
    this.el?.remove()
  }

  /**
   * 重新渲染食物元素
   */
  rerender() {
    // 每次渲染食物元素时，先将页面已有食物元素删除
    this.el?.remove()
    // 随机产生食物的坐标
    this.generateCoordinate()
    // 再重新渲染
    this.render()
  }
}