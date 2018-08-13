import { CustomPIXIComponent } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'

export const behavior = {
  customDisplayObject: props => new PIXI.Graphics(),
  customApplyProps: function(instance, oldProps, newProps) {
    if (oldProps !== undefined) instance.clear()
    const { width, height } = newProps
    instance.lineStyle(1, 0xe0e0e0, 1)
    const colWidth = width / 9
    const lineHeight = height / 9

    for (let line = 0; line < 10; line++) {
      instance.moveTo(0, line * lineHeight).lineTo(width, line * lineHeight)
      for (let col = 0; col < 10; col++) {
        instance.moveTo(col * colWidth, 0).lineTo(col * colWidth, height)
      }
    }
  }
}
export default CustomPIXIComponent(behavior, 'Board')
