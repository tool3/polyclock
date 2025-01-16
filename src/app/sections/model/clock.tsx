/* eslint-disable react/no-unknown-property */

import { Center } from '@react-three/drei'
import gsap from 'gsap'
import { useCallback, useEffect, useState } from 'react'

import DigitModel from './clock_model'
import Dot from './dot'
import { useControls } from 'leva'

export default function Clock() {
  const [time, setTime] = useState({ hours: '', minutes: '', seconds: '' })

  const to = useCallback((directions: any[], reverses: any[]) => {
    const duration = 0.2
    if (reverses?.length) {
      reverses?.forEach((item) => {
        const { ref, axis } = item
        gsap.to(ref.current.rotation, {
          [axis]: 0,
          duration
        })
      })
    }

    if (directions?.length) {
      directions?.forEach((item) => {
        const { ref, axis, negative } = item
        gsap.to(ref.current.rotation, {
          [axis]: negative ? -Math.PI / 2 : Math.PI / 2,
          duration
        })
      })
    }
  }, [])

  useEffect(() => {
    const MINUTE_MS = 500
    const interval = setInterval(() => {
      const currentTime = new Date()
      const hours = currentTime.getHours().toString().padStart(2, '0')
      const minutes = currentTime.getMinutes().toString().padStart(2, '0')
      const seconds = currentTime.getSeconds().toString().padStart(2, '0')

      setTime({ hours, minutes, seconds })
    }, MINUTE_MS)

    return () => clearInterval(interval)
  }, [])

  const { color, intensity } = useControls('Digits', {
    color: '#ff4f00',
    intensity: {
      value: 2.0,
      min: 0.1,
      max: 5
    }
  })

  const [first, second] = time.hours
  const [third, fourth] = time.minutes
  const [fifth, sixth] = time.seconds

  return (
    <Center>
      <group>
        <DigitModel
          state={first}
          color={color}
          intensity={intensity}
          to={to}
          scale={0.5}
          position={[-5, -5, 0]}
          max={'2'}
        />
        <DigitModel
          state={second}
          color={color}
          intensity={intensity}
          to={to}
          scale={0.5}
          position={[0, -5, 0]}
          max={'3'}
        />
        <group position={[3, 0, .45]}>
          <Dot
            color={color}
            intensity={intensity}
            position={[0, 1, 0]}
            scale={0.5}
          />
          <Dot
            color={color}
            intensity={intensity}
            position={[0, -2.5, 0]}
            scale={0.5}
          />
        </group>
      </group>
      <group position={[1, 0, 0]}>
        <DigitModel
          state={third}
          color={color}
          intensity={intensity}
          to={to}
          scale={0.5}
          position={[5, -5, 0]}
          max={'5'}
        />
        <DigitModel
          state={fourth}
          color={color}
          intensity={intensity}
          to={to}
          scale={0.5}
          position={[10, -5, 0]}
          max={'9'}
        />
        <group position={[3, 0, .45]}>
          <Dot
            color={color}
            intensity={intensity}
            position={[10, 1, 0]}
            scale={0.5}
          />
          <Dot
            color={color}
            intensity={intensity}
            position={[10, -2.5, 0]}
            scale={0.5}
          />
        </group>
      </group>
      <group position={[2, 0, 0]}>
        <DigitModel
          state={fifth}
          color={color}
          intensity={intensity}
          to={to}
          scale={0.5}
          position={[15, -5, 0]}
          max={'5'}
        />
        <DigitModel
          state={sixth}
          color={color}
          intensity={intensity}
          to={to}
          scale={0.5}
          position={[20, -5, 0]}
          max={'9'}
        />
      </group>
    </Center>
  )
}
