import { Html } from '@react-three/drei'
import clsx from 'clsx'
import gsap from 'gsap'
import { useEffect, useLayoutEffect, useState } from 'react'

import s from './loader.module.scss'

export default function Loader() {
  const [rendered, setRendered] = useState(false)

  const style = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  } as any

  useEffect(() => {
    addEventListener('rendered', () => setRendered(true))
    return () => removeEventListener('rendered', () => setRendered(true))
  })

  useLayoutEffect(() => {
    gsap.to(`.${s.letter}`, {
      yPercent: -100,
      ease: 'expo.out',
      stagger: 0.05,
      duration: 0.3,
      delay: 1
    })
  }, [rendered])

  const inLetters = ['P', 'O', 'L', 'Y', 'C', 'L', 'O', 'C', 'K']

  const letterInComponents = inLetters.map((letter, i) => {
    return (
      <div key={i} className={clsx(s.letter)}>
        {letter}
      </div>
    )
  })

  return (
    <Html
      center
      style={style}
      className={clsx(s.loader, rendered ? s.rendered : '')}
    >
      <div className={s.letters}>{letterInComponents}</div>
    </Html>
  )
}
