import { useLayoutEffect, useState } from 'react'

/* @ts-ignore */
import Click from '../app/sections/model/click.mp3'
import useInteraction from './use-interaction'

export default function useAudio() {
  const interacted = useInteraction()
  const [audio, setAudio] = useState() as any

  useLayoutEffect(() => {
    ;(async () => {
      if (interacted) {
        const { Howl } = await import('howler')

        setAudio(
          new Howl({
            src: [Click],
            format: ['mp3'],
            preload: true,
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
