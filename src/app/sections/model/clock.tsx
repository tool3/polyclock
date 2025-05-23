/* eslint-disable react/no-unknown-property */

import { Center } from '@react-three/drei'
import gsap from 'gsap'
import { useControls } from 'leva'
import { useCallback, useLayoutEffect, useState } from 'react'

import useAudio from '~/hooks/use-audio'
import useFavicons from '~/hooks/use-favicons'

import DigitModel from './clock_model'
import Dot from './dot'

export default function Clock() {
  const [time, setTime] = useState({
    hours: '88',
    minutes: '88',
    seconds: '88'
  })

  useFavicons({ hours: time.hours })

  const intensity = 2.0
  const { color, base, sound, track } = useControls(
    'Digits',
    {
      sound: false,
      track: {
        value: 'tock',
        options: {
          crank: 'crank',
          tick: 'tick',
          tock: 'tock'
        }
      },
      base: '#000000',
      color: '#ff5f15'
    },
    { order: 0 }
  )
  const audio = useAudio({ track }) as any

  const animateDigit = useCallback(
    (
      target: any,
      prop: any,
      value: any,
      options = { ease: 'back.inOut(4)', duration: 0.3 }
    ) => {
      gsap.to(target, {
        [prop]: value,
        ...options
      })
    },
    []
  )

  const to = useCallback(
    (directions: any[], reverses: any[]) => {
      if (reverses?.length) {
        reverses?.forEach((item) => {
          const { ref, axis } = item
          animateDigit(ref.current.rotation, axis, 0)
          if (ref.current?.children) {
            const [, child] = ref.current.children
            const target = child.material
            animateDigit(target, 'emissiveIntensity', intensity, {
              ease: 'power4.out(10)',
              duration: 0.8
            })
          }
        })
      }

      if (directions?.length) {
        directions?.forEach((item) => {
          const { ref, axis, negative } = item
          const target = ref.current.rotation
          const value = negative ? -Math.PI / 2 : Math.PI / 2
          animateDigit(target, axis, value)

          if (ref.current?.children) {
            const [, child] = ref.current.children
            animateDigit(child.material, 'emissiveIntensity', 0.01, {
              duration: 0.8,
              ease: 'power1.out(10)'
            })
          }
        })
      }
      if (audio && sound && !audio.playing()) {
        audio.play()
      }
    },
    [intensity, animateDigit, audio, sound]
  )

  const [counter, setCounter] = useState(1000)

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date()
      const hours = currentTime.getHours().toString().padStart(2, '0')
      const minutes = currentTime.getMinutes().toString().padStart(2, '0')
      const seconds = currentTime.getSeconds().toString().padStart(2, '0')
      setTime({ hours, minutes, seconds })
      setCounter(counter + 1000)
    }, 5)

    return () => clearInterval(interval)
  }, [counter])

  const [first, second] = time.hours
  const [third, fourth] = time.minutes
  const [fifth, sixth] = time.seconds

  const digitProps = {
    color,
    base,
    intensity,
    to,
    scale: 0.5
  }

  const dotProps = {
    color,
    base,
    intensity,
    seconds: time.seconds,
    scale: 0.5
  }

  return (
    <Center>
      <group>
        <DigitModel
          {...digitProps}
          state={first}
          position={[-5, -5, 0]}
          max={'2'}
        />
        <DigitModel
          {...digitProps}
          state={second}
          position={[0, -5, 0]}
          max={'3'}
          dotsHolder
        />
        <group position={[3, 0, 0.45]}>
          <Dot {...dotProps} position={[0, 1.6, -0.21]} />
          <Dot {...dotProps} position={[0, -3.3, -0.21]} />
        </group>
      </group>
      <group position={[1, 0, 0]}>
        <DigitModel
          {...digitProps}
          state={third}
          position={[5, -5, 0]}
          max={'5'}
        />
        <DigitModel
          {...digitProps}
          state={fourth}
          scale={0.5}
          position={[10, -5, 0]}
          max={'9'}
          dotsHolder
        />
        <group position={[3, 0, 0.45]}>
          <Dot {...dotProps} position={[10, 1.6, -0.21]} />
          <Dot {...dotProps} position={[10, -3.3, -0.21]} />
        </group>
      </group>
      <group position={[2, 0, 0]}>
        <DigitModel
          {...digitProps}
          state={fifth}
          position={[15, -5, 0]}
          max={'5'}
        />
        <DigitModel
          {...digitProps}
          state={sixth}
          position={[20, -5, 0]}
          max={'9'}
          last
        />
      </group>
    </Center>
  )
}
