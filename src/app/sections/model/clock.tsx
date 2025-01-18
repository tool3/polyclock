/* eslint-disable react/no-unknown-property */

import { Center } from '@react-three/drei'
import gsap from 'gsap'
import { useControls } from 'leva'
import { useCallback, useEffect, useState } from 'react'

import DigitModel from './clock_model'
import Dot from './dot'

export default function Clock() {
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState({ hours: '', minutes: '', seconds: '' })
  const { color, base, intensity } = useControls('Digits', {
    base: '#1e1e1e',
    color: '#ff4f00',
    intensity: {
      value: 3.5,
      min: 0,
      max: 10
    }
  })

  const animateDigit = useCallback(
    (
      target: any,
      prop: any,
      value: any,
      options = { ease: 'back.inOut(4)', duration: 0.2 }
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
            animateDigit(target, 'emissiveIntensity', intensity)
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
            animateDigit(child.material, 'emissiveIntensity', 0.3, {
              duration: 0.5,
              ease: 'power4.out'
            })
          }
        })
      }
    },
    [intensity, animateDigit]
  )

  useEffect(() => {
    const currentTime = new Date()
    const hours = currentTime.getHours().toString().padStart(2, '0')
    const minutes = currentTime.getMinutes().toString().padStart(2, '0')
    const seconds = currentTime.getSeconds().toString().padStart(2, '0')
    setTime({ hours, minutes, seconds })
    setDate(currentTime)
  }, [date])

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
          <Dot {...dotProps} position={[0, 1, 0]} />
          <Dot {...dotProps} position={[0, -2.5, 0]} />
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
          <Dot {...dotProps} position={[10, 1, 0]} />
          <Dot {...dotProps} position={[10, -2.5, 0]} />
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
