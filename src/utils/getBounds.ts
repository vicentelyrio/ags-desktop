import { Widget } from 'types/@girs/gtk-3.0/gtk-3.0.cjs'

export function getBounds(self: Widget) {
  const alloc = self.get_allocation()

  return {
    x: alloc.x,
    y: alloc.y,
    width: alloc.width,
    height: alloc.height,
    centerx: alloc.x + (alloc.width / 2),
    centery: alloc.y + (alloc.height / 2),
  }
}

