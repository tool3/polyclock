/* eslint-disable react/no-unknown-property */
import { OrbitControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing'
import { button, Leva, useControls } from 'leva'
import { ReactNode, Suspense, useRef, useState } from 'react'

import Debug from '../debug/debug'
import Loader from '../loader/loader'

export default function CanvasWithModel({
  style,
  children
}: {
  style?: any
  children: ReactNode
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState(false)

  const { enabled, luminanceThreshold, luminanceSmoothing, intensity } =
    useControls(
      'Bloom',
      {
        enabled: true,
        luminanceThreshold: {
          value: 1.0,
          min: 0,
          max: 1
        },
        luminanceSmoothing: {
          value: 1.0,
          min: 0,
          max: 1
        },
        intensity: {
          value: 5.0,
          min: 0,
          max: 10
        }
      },
      { order: 1 }
    )
  const { background, fps } = useControls({
    fps: false,
    background: '#454545'
  })

  return (
    <>
      <Leva collapsed hidden={!active} />
      {fps ? <Stats /> : null}
      <Debug set={setActive} />
      <Canvas
        ref={canvasRef}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
        orthographic
        camera={{
          frustumCulled: true,
          fov: 70,
          position: [0, 0, 50],
          zoom: 20
        }}
        style={style}
      >
        <color attach="background" args={[background]} />
        <Wrapper>{children}</Wrapper>
        {enabled ? (
          <EffectComposer>
            <Bloom
              intensity={intensity}
              luminanceThreshold={luminanceThreshold}
              luminanceSmoothing={luminanceSmoothing}
              height={1024}
              width={1024}
            />
            <Noise opacity={0.05} />
          </EffectComposer>
        ) : null}
      </Canvas>
    </>
  )
}

function Wrapper({ children }) {
  const target = useRef() as any

  useControls({
    ['reset camera']: button(() => {
      target.current.reset()
    })
  })

  return (
    <Suspense fallback={<Loader />}>
      <Suspense fallback={null}>{children}</Suspense>
      <OrbitControls ref={target} makeDefault minZoom={10} maxZoom={100} />
    </Suspense>
  )
}
