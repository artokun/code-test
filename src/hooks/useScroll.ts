import { useState, useEffect } from 'react'

function useScroll() {
  const isClient = typeof window === 'object'

  const getScrollPos = () => {
    return isClient ? window.scrollY : undefined
  }

  const handleListener: any = () => {
    if (!isClient) {
      return false
    }

    function handleScroll() {
      setScrollPos(getScrollPos())
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }

  const [scrollPos, setScrollPos] = useState(getScrollPos)

  useEffect(handleListener, [])

  return scrollPos
}

export { useScroll }
