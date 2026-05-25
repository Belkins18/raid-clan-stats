import { useEffect, useRef, useState } from 'react'

export const useElementWidth = <TElement extends HTMLElement>() => {
  const elementRef = useRef<TElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const element = elementRef.current

    if (!element) return

    const updateWidth = () => {
      setWidth(element.clientWidth)
    }

    updateWidth()

    const resizeObserver = new ResizeObserver(updateWidth)
    resizeObserver.observe(element)

    return () => resizeObserver.disconnect()
  }, [])

  return [elementRef, width] as const
}
