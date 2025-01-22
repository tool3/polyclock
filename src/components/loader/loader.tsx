'use client'
import { Html, useProgress } from '@react-three/drei'
import clsx from 'clsx'
import gsap from 'gsap'
import { useEffect } from 'react'

import { useHasRendered } from '~/hooks/use-has-rendered'

import s from './loader.module.scss'

export default function Loader() {
  const rendered = useHasRendered()
  const { progress } = useProgress()

  const style = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  } as any

  useEffect(() => {
    if (progress === 100) {
      gsap.to(`.${s.letters} .${s.letter}`, {
        yPercent: -100,
        ease: 'back.inOut',
        stagger: 0.05,
        duration: 1,
        delay: 1
      })
      gsap.to(`.${s.loader}`, {
        opacity: 0,
        delay: 2
      })
      gsap.to(`.${s.loader}`, {
        display: 'none',
        delay: 2.5
      })
    }
  }, [progress])

  const inLetters = ['P', 'O', 'L', 'Y', 'C', 'L', 'O', 'C', 'K']
  const letterInComponents = inLetters.map((letter, i) => {
    return (
      <div key={i} className={s.letter}>
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
