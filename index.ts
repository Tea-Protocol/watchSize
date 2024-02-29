import { Dom } from '@shawncvv/dom-extension'

export interface WatchSizeConfig {
  /** 监听的目标 */
  target: string | Element
  /** 超出最大宽度执行方法 */
  maxWidth?: [number, () => void]
  /** 低于最小宽度执行方法 */
  minWidth?: [number, () => void]
  /** 超出最大高度执行方法 */
  maxHeight?: [number, () => void]
  /** 低于最小高度执行方法 */
  minHeight?: [number, () => void]
}

/** 监听窗口或Dom大小发生变化 */
export const watchSize = (config: WatchSizeConfig) => {
  const { maxWidth, minWidth, maxHeight, minHeight, target } = config
  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      const { height, width } = entry.contentRect
      if (maxWidth && maxWidth[0] < width) maxWidth[1]()
      if (minWidth && minWidth[0] > width) minWidth[1]()
      if (maxHeight && maxHeight[0] < height) maxHeight[1]()
      if (minHeight && minHeight[0] > height) minHeight[1]()
    }
  })
  const node = typeof target === 'string' ? Dom.query(target) : target

  resizeObserver.observe(node as Element)
}
