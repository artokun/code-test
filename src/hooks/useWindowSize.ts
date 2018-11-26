import { useState, useEffect } from 'react'

function useWindowSize() {
  const isClient = typeof window === 'object'

  const getSize = () => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    }
  }

  const handleListener: any = () => {
    if (!isClient) {
      return false
    }

    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(handleListener, [])

  return windowSize
}

export { useWindowSize }
