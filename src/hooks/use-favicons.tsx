import { useLayoutEffect } from 'react'

export default function useFavicons({ hours }) {
  useLayoutEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]')

    if (favicon) {
      favicon.setAttribute('href', `/images/favicons/${hours}.ico`)
    }
  }, [hours])
}
