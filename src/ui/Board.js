import { CustomPIXIComponent } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'

export const behavior = {
  customDisplayObject: props => new PIXI.Graphics(),
  customApplyProps: function(instance, oldProps, newProps) {
    instance.clear()
    const { x, y, width, height } = newProps
    instance.lineStyle(1, 0xe0e0e0, 1)
    const colWidth = width / 9
    const lineHeight = height / 9

    for (let line = 0; line < 10; line++) {
      instance.moveTo(x, y + line * lineHeight)
      instance.lineTo(x + width, y + line * lineHeight)
      for (let col = 0; col < 10; col++) {
        instance.moveTo(x + col * colWidth, y)
        instance.lineTo(x + col * colWidth, y + height)
      }
    }
  }
}
export default CustomPIXIComponent(behavior, 'Board')
