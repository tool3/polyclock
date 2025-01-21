import { useLayoutEffect, useState } from 'react'

import Click from '../app/sections/model/click.mp3'
import useInteraction from './use-interaction'

export default function useAudio() {
  const [audio, setAudio] = useState(null)
  const interacted = useInteraction()
  useLayoutEffect(() => {
    ;(async () => {
      if (interacted) {
        const { Howl } = await import('howler')
        setAudio(
          new Howl({
            src: [Click],
            format: ['mp3'],
            preload: false,
            autoplay: false,
            html5: true
          })
        )
      }
    })()

    return () => {
      if (audio) {
        audio.unload()
      }
    }
  }, [interacted])

  return audio
}
