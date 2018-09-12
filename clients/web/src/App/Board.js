import { CustomPIXIComponent } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'

export const behavior = {
  customDisplayObject: props => new PIXI.Graphics(),
  customApplyProps: function(graphics, oldProps, newProps) {
    if (oldProps !== undefined) graphics.clear()
    const { maxWidth, maxHeight } = newProps
    const colWidth = maxWidth / 9
    const lineHeight = maxHeight / 9

    // Grid
    graphics.lineStyle(1, 0xe0e0e0, 1)
    for (let line = 0; line < 10; line++) {
      graphics.moveTo(0, line * lineHeight).lineTo(maxWidth, line * lineHeight)
      for (let col = 0; col < 10; col++) {
        graphics.moveTo(col * colWidth, 0).lineTo(col * colWidth, maxHeight)
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
