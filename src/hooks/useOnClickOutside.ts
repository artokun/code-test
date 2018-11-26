import { useEffect } from 'react'

function useOnClickOutside(
  ref: React.RefObject<any>,
  handler: EventHandlerNonNull,
  ignored: Array<React.RefObject<any>> = []
) {
  useEffect(() => {
    const listener: EventListener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      // Do nothing if you click on an ignored element
      if (
        ignored.findIndex(
          i => i.current && i.current.contains(event.target)
        ) !== -1
      ) {
        return
      }

      handler(event)
    }

    document.addEventListener('mouseup', listener)
    document.addEventListener('touchend', listener)

    return () => {
      document.removeEventListener('mouseup', listener)
      document.removeEventListener('touchend', listener)
    }
  }, [])
}

export { useOnClickOutside }
