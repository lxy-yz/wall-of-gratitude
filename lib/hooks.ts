import { useEffect, useRef, useState } from "react"

export function useSticky<T extends HTMLElement>() {
  const stickyRef = useRef<T>(null)
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    // Observe when ref enters or leaves sticky state
    // rAF https://stackoverflow.com/questions/41740082/scroll-events-requestanimationframe-vs-requestidlecallback-vs-passive-event-lis
    function observe() {
      if (!stickyRef.current) return
      const refPageOffset = stickyRef.current.getBoundingClientRect().top
      const stickyOffset = parseInt(getComputedStyle(stickyRef.current).top)
      const stickyActive = refPageOffset <= stickyOffset

      if (stickyActive && !sticky) setSticky(true)
      else if (!stickyActive && sticky) setSticky(false)
    }
    observe()

    // Bind events
    document.addEventListener("scroll", observe)
    window.addEventListener("resize", observe)
    window.addEventListener("orientationchange", observe)

    return () => {
      document.removeEventListener("scroll", observe)
      window.removeEventListener("resize", observe)
      window.removeEventListener("orientationchange", observe)
    }
  }, [sticky])

  return [stickyRef, sticky] as const
}

// https://usehooks-ts.com/react-hook/use-media-query
export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches
    }
    return false
  }

  const [matches, setMatches] = useState<boolean>(getMatches(query))

  function handleChange() {
    setMatches(getMatches(query))
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query)

    // Triggered at the first client-side load and if query changes
    handleChange()

    // Listen matchMedia
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange)
    } else {
      matchMedia.addEventListener("change", handleChange)
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange)
      } else {
        matchMedia.removeEventListener("change", handleChange)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return matches
}
