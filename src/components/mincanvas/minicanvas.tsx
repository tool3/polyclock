/* eslint-disable react/no-unknown-property */
import { Environment, OrbitControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { button, Leva, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { ReactNode, Suspense, useRef, useState } from 'react'

import { useDeviceDetect } from '~/hooks/use-device-detect'
import useShortcuts from '~/hooks/use-shortcuts'

import Debug from '../debug/debug'
import Effects from './effects'
import gsap from 'gsap'

export default function CanvasWithModel({
  style,
  children
}: {
  style?: any
  children: ReactNode
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const target = useRef() as any
  const [active, setActive] = useState(false)
  const { isMobile } = useDeviceDetect()
  useShortcuts({
    key: 'Digit0',
    action: () => {
      // target.current.reset()
      console.log(target.current.target)
      gsap.to(target.current.target, { x: 0, y: 0, z: 0 })
    }
  })

  const zoom = isMobile ? 10 : 20

  const { fps, background } = useControls({
    fps: false,
    background: {
      value: '#722c0b',
      onEditEnd: (value) => {
        const meta = document.querySelector('meta[name="theme-color"]')
        if (meta) {
          meta.setAttribute('content', value)
        }
        return value
      }
    }
  })

  useControls({
    ['reset camera']: button(() => {
      target.current.reset()
    })
  })

  return (
    <>
      <Leva collapsed hidden={!active} />
      {fps ? <Stats /> : null}
      <Debug set={setActive} />
      <Canvas
        ref={canvasRef}
        dpr={[1, 2]}
        orthographic
        camera={{
          frustumCulled: true,
          fov: 70,
          position: [0, 0, 50],
          zoom
        }}
        gl={{ premultipliedAlpha: false, powerPreference: 'high-performance' }}
        style={style}
      >
        <color attach="background" args={[background]} />
        {fps ? <Perf position="bottom-left" logsPerSecond={1} /> : null}

        <Suspense fallback={null}>{children}</Suspense>
        <Environment
          files={'/textures/environments/studio_small_03_1k.hdr'}
          environmentRotation={[0, 0, Math.PI / 2]}
        />

        <Effects />

        <OrbitControls ref={target} makeDefault minZoom={10} maxZoom={100} />
      </Canvas>
    </>
  )
}
