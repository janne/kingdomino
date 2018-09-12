import { CustomPIXIComponent } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'

export const behavior = {
  customDisplayObject: props => new PIXI.Graphics(),
  customApplyProps: function(graphics, oldProps, newProps) {
    if (oldProps !== undefined) graphics.clear()
    const { maxWidth, maxHeight, minX, maxX, minY, maxY } = newProps
    const colWidth = maxWidth / 9
    const lineHeight = maxHeight / 9
    const diffX = 4 - (maxX - minX)
    const diffY = 4 - (maxY - minY)
    const fromX = minX + 4 - diffX
    const fromY = minY + 4 - diffY
    const toX = maxX + 5 + diffX
    const toY = maxY + 5 + diffY

    // Grid
    graphics.lineStyle(1, 0xe0e0e0, 1)
    for (let line = fromY; line <= toY; line++) {
      graphics
        .moveTo(fromX * colWidth, line * lineHeight)
        .lineTo(toX * colWidth, line * lineHeight)
      for (let col = fromX; col <= toX; col++) {
        graphics
          .moveTo(col * colWidth, fromY * lineHeight)
          .lineTo(col * colWidth, toY * lineHeight)
      }
    }

    // Castle
    graphics
      .beginFill(0xdddddd)
      .drawRect(colWidth * 4, colWidth * 4, colWidth, colWidth)
      .endFill()
  }
}
export default CustomPIXIComponent(behavior, 'Board')
