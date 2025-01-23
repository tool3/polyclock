import { useEffect } from 'react'

export default function useShortcuts({ key, action }) {
  function handleKeyDown(e) {
    if (e.code === key) {
      action(e)
    }
  }

  useEffect(() => {
    addEventListener('keydown', handleKeyDown)

    return () => removeEventListener('keydown', handleKeyDown)
  }, [])
}
