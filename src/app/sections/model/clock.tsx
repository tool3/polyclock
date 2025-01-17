/* eslint-disable react/no-unknown-property */

import { Center } from '@react-three/drei'
import gsap from 'gsap'
import { useControls } from 'leva'
import { useCallback, useEffect, useState } from 'react'

import DigitModel from './clock_model'
import Dot from './dot'

export default function Clock() {
  const [time, setTime] = useState({ hours: '', minutes: '', seconds: '' })

  const { color, intensity } = useControls('Digits', {
    color: '#ff4f00',
    intensity: {
      value: 2.0,
      min: 0.1,
      max: 5
    }
  })

  const to = useCallback(
    (directions: any[], reverses: any[]) => {
      const duration = 0.2
      if (reverses?.length) {
        reverses?.forEach((item) => {
          const { ref, axis } = item
          gsap.to(ref.current.rotation, {
            [axis]: 0,
            ease: 'back.inOut(4)',
            duration
          })
          if (ref.current?.children) {
            const child = ref.current.children[1]
            gsap.to(child.material, {
              emissiveIntensity: intensity,
              duration
            })
          }
        })
      }

      if (directions?.length) {
        directions?.forEach((item) => {
          const { ref, axis, negative } = item
          gsap.to(ref.current.rotation, {
            [axis]: negative ? -Math.PI / 2 : Math.PI / 2,
            ease: 'back.inOut(4)',
            duration
          })
          if (ref.current?.children) {
            const child = ref.current.children[1]

            gsap.to(child.material, {
              emissiveIntensity: 0.3,
              duration
            })
          }
        })
      }
    },
    [intensity]
  )

  useEffect(() => {
    const MINUTE_MS = 4
    const interval = setInterval(() => {
      const currentTime = new Date()
      const hours = currentTime.getHours().toString().padStart(2, '0')
      const minutes = currentTime.getMinutes().toString().padStart(2, '0')
      const seconds = currentTime.getSeconds().toString().padStart(2, '0')
      setTime({ hours, minutes, seconds })
    }, MINUTE_MS)

    return () => clearInterval(interval)
  }, [])

  const [first, second] = time.hours
  const [third, fourth] = time.minutes
  const [fifth, sixth] = time.seconds

  const digitProps = {
    color,
    intensity,
    to,
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
        />
        <group position={[3, 0, 0.45]}>
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
        />
        <group position={[3, 0, 0.45]}>
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
        />
      </group>
    </Center>
  )
}
