/* eslint-disable react/no-unknown-property */
import { Environment, OrbitControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  Bloom,
  EffectComposer,
  Scanline,
  Vignette
} from '@react-three/postprocessing'
import { button, Leva, useControls } from 'leva'
import { Perf } from 'r3f-perf'
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
          value: 1.5,
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
        shadows
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
        {fps ? <Perf position="bottom-left" logsPerSecond={1} /> : null}
        <Wrapper>{children}</Wrapper>
        <Environment
          files={'/textures/environments/studio_small_03_1k.hdr'}
          environmentIntensity={0.3}
        />
        {enabled ? (
          <EffectComposer stencilBuffer>
            <Bloom
              mipmapBlur
              intensity={intensity}
              luminanceThreshold={luminanceThreshold}
              luminanceSmoothing={luminanceSmoothing}
            />
            {/* <Noise opacity={0.5} /> */}
            <Scanline opacity={0.05} />
            <Vignette darkness={0.5} />
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
