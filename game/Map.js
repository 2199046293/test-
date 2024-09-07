/**
 * 地图类
 */
class Map {
  /**
   * 初始化地图基本特征
   * @param {*} container 地图所放置的容器
   * @param {*} width 宽度
   * @param {*} height 高度
   * @param {*} cellWidth 单元格宽度
   * @param {*} cellHeight 单元格高度
   * @param {*} bgColor 背景
   */
  constructor(container, width = 600, height = 400, cellWidth = 20, cellHeight = 20, bgColor = 'gray') {
    this.container = container
    this.width = width
    this.height = height
    this.cellWidth = cellWidth
    this.cellHeight = cellHeight
    this.bgColor = bgColor

    // 使用 el 属性引用当前地图在页面渲染的 DOM 元素
    this.el = null
    // 地图上所能够容纳的最大行数与列数
    this.rows = Math.floor(height / cellHeight)
    this.cols = Math.floor(width / cellWidth)

    this.render()
  }

  /**
   * 渲染地图
   */
  render() {
    // 动态创建出需要渲染地图的元素
    const div = document.createElement('div')
    this.el = div
    // 为动态创建出的地图元素设置 css 样式
    css(div, {
      width: this.width,
      height: this.height,
      backgroundColor: this.bgColor,
      position: 'relative',
      borderTop: '1px solid #000',
      borderLeft: '1px solid #000',
      display: 'flex',
      flexWrap: 'wrap',
    })

    // 可以将单元格画出来
    const rows = Math.floor(this.height / this.cellHeight)
    const cols = Math.floor(this.width / this.cellWidth)
    let html = ''
    for(let i = 0; i < rows; i++) {
      for(let j = 0; j < cols; j++) {
        html += `
          <div style="
            width: ${this.cellWidth}px;
            height: ${this.cellHeight}px;
            border-right: 1px solid #000;
            border-bottom: 1px solid #000;
            box-sizing: border-box;
          "></div>
        `
      }
    }
    div.innerHTML = html

    // 将地图元素追加到页面中游戏容器内部
    this.container.appendChild(div)
  }
}
