/* eslint-disable react/no-unknown-property */
import { Environment, OrbitControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { button, Leva, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { ReactNode, Suspense, useEffect, useRef, useState } from 'react'

import { useDeviceDetect } from '~/hooks/use-device-detect'
import useShortcuts from '~/hooks/use-shortcuts'

import Debug from '../debug/debug'
import Effects from './effects'

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
  const { isMobile, isTablet, isAndroid } = useDeviceDetect()
  const zoom = isMobile && !isTablet ? 13 : 30

  useShortcuts({
    Digit0: {
      key: 'Digit0',
      action: () => {
        target.current.reset()
      }
    }
  })

  const { fps, background } = useControls(
    {
      fps: false,
      background: {
        value: isAndroid ? '#000000' : '#722c0b',
        onEditEnd: (value) => {
          const meta = document.querySelector('meta[name="theme-color"]')
          if (meta) {
            meta.setAttribute('content', value)
          }
          return value
        }
      }
    },
    { order: -1 }
  )

  useControls(
    {
      ['reset camera']: button(() => {
        target.current.reset()
      })
    },
    { order: -1 }
  )

  useEffect(() => {
    if (target.current) {
      gsap.from(target.current, { zoom: 0, delay: 10 })
    }
  }, [target])

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
